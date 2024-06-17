const { Router } = require("express");
const { getEventos, actualizarEvento, borrarEvento, crearEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();
// CRUD

// Validarlas con JWT
router.use( validarJWT );

// READ: Obtener events
// get / getEventos
router.get( "/", getEventos );
// router.use( validarJWT );

// CREATE:
// post / crearEvento
router.post( "/", [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom( isDate ),
    check("end", "Fecha de finalización obligatoria").custom( isDate ),
    validarCampos
],crearEvento );

// UPDATE:
// put /:id actualizarEvento
router.put( "/:id", [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom( isDate ),
    check("end", "Fecha de finalización obligatoria").custom( isDate ),
    validarCampos
], actualizarEvento );

// DELETE:
// delete /:id borrarEvento
router.delete( "/:id", borrarEvento );

module.exports = router;