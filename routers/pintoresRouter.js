const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/pintores.controller");
const authMiddleware = require("../middleware/auth.middleware");



//METODOS CRUD TABLA PINTORES
router.get('/',controller.allPintores);
router.post('/',authMiddleware.authenticateTokenAdmin,controller.storePintor);
//Post solo van a poder usarlo los usuarios ADMIN
router.get('/:idpintor', controller.showPintor);
router.put('/:idpintor', authMiddleware.authenticateTokenAdmin, controller.updatePintor);
//Update sólo van a poder usarlo los usuarios ADMIN
router.delete('/:idpintor', authMiddleware.authenticateTokenAdmin, controller.destroyPintor);
//Delete sólo van a poder usarlo los usuarios ADMIN



// EXPORTAR ROUTERS
module.exports = router;