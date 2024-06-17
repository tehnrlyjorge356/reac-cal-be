const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
    // const { name, email, password } = req.body;
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if( usuario ) return res.status(400).json({
            ok: false,
            msg: "El usuario ya existe"
        })
        // const usuario = new Usuario( req.body )
        // await usuario.save();
        usuario = new Usuario( req.body )

        // encriptar contraseña
            // Generar un salt
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        await usuario.save();

        // Generar jwt
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).json({
            ok: true,
            // msg: "registro".
            uid: usuario.id,
            name: usuario.name,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor contacte al administrador del sistema"
        })
    }

}

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if( !usuario ) return res.status(400).json({
            ok: false,
            msg: "El usuario o la contraseña no existen"
        })

        const validPassword = bcrypt.compareSync( password, usuario.password );
        if( !validPassword ) return res.status(400).json({
            ok: false,
            msg: "El usuario o la CONTraseña no existen"
        })

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(200).json({
            ok: true,
            // msg: "registro".
            uid: usuario.id,
            name: usuario.name,
            token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor contacte al administrador del sistema"
        })
    }

    // res.status(200).json({
    //     ok: true,
    //     msg: "login",
    //     email,
    //     password
    // })
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;
    // generar nuevo jwt y retornarlo
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken,
}