/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/mensajes.controller");

//// METODO GET  /////

// Para todos los mensajes
router.get('/', controller.allMensajes);

// Para un mensaje
router.get('/:idmensaje', controller.showMensaje);

//// METODO POST  ////
router.post('/', controller.storeMensaje);

//// METODO PUT  ////
router.put('/:idmensaje', controller.updateMensaje);

//// METODO DELETE ////
router.delete('/:idmensaje', controller.destroyMensaje);

// EXPORTAR ROUTERS
module.exports = router;