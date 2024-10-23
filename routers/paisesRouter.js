/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/paises.controller");
const authMiddleware = require("../middleware/auth.middleware");



//METODOS CRUD TABLA PAISES
router.get('/',authMiddleware.authenticateToken, controller.allPaises);
router.post('/',authMiddleware.authenticateTokenAdmin, controller.storePais);
//Post sólo van a poder usarlo los usuarios ADMIN
router.get('/:idpais', authMiddleware.authenticateToken, controller.showPais);
router.put('/:idpais', authMiddleware.authenticateTokenAdmin, controller.updatePais);
//Update sólo van a poder usarlo los usuarios ADMIN
router.delete('/:idpais', authMiddleware.authenticateTokenAdmin, controller.destroyPais);
//Delete sólo van a poder usarlo los usuarios ADMIN



// EXPORTAR ROUTERS
module.exports = router;