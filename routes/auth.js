/**
 * Rutas de usuarios / auth
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
// const router = express.Router;
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth")
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
// router.get("/", (req, res) => {
//     res.json({
//         ok: true
//     })
// })

router.post( "/new", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio: example@example.com").not().isEmpty().isEmail(),
        check("password", "El password es obligatorio de 6 caracteres").not().isEmpty().isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario )
router.post( 
    "/", 
    [
        check("email", "Falta usuario").not().isEmpty().isEmail(),
        check("password", "La constraseña tiene 6 chars").isLength({ min: 6}),
        validarCampos,
    ],
    loginUsuario )
router.get( "/renew", validarJWT,revalidarToken )

module.exports = router;