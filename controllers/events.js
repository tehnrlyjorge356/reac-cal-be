const { response } = require("express");
// CRUD events controller
// events routes: api/events
const Evento = require("../models/Evento");

const crearEvento = async( req, res = response ) => {

    // verificar evento
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardao = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardao
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactar al admin"
        })
    }

    // return res.status(201).json({
    //     ok: true,
    //     msg: "crearEventos",
    // })
}

const getEventos = async( req, res = response ) => {
    const eventos = await Evento.find()
                                .populate("user", "name");

    return res.status(200).json({
        ok: true,
        eventos
    })
}

const actualizarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid; 
    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ) return res.status(404).json({
            ok: false,
            msg: "Evento no existe",
        })

        if( evento.user.toString() !== uid ) return res.status(401).json({
            ok: false,
            msg: "No tiene privilegio de editar"
        })

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizao = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizao
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin",
        })
    }
    // return res.status(201).json({
    //     ok: true,
    //     msg: eventoId,
    // })
}

const borrarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);
        if( !evento ) return res.status(404).json({
            ok: false,
            msg: "No encontrao",
        })

        if( evento.user.toString() !== req.uid ) return res.status(401).json({
            ok: false,
            msg: "Aonde, padrino?"
        })
        const deletedEvent = await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok: true,
            deletedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Uy, padrino, hable con el admin"
        })
    }
    // return res.status(200).json({
    //     ok: true,
    //     msg: "borrarEventos",
    // })
}


module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    borrarEvento,
}