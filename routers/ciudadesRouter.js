const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/ciudades.controller");
const authMiddleware = require("../middleware/auth.middleware");



//METODOS CRUD TABLA PAISES
router.get('/',authMiddleware.authenticateToken, controller.allCiudades);
router.post('/',authMiddleware.authenticateTokenAdmin,controller.storeCiudad);
//Post solo van a poder usarlo los usuarios ADMIN
router.get('/:idciudad', authMiddleware.authenticateToken, controller.showCiudad);
router.put('/:idciudad', authMiddleware.authenticateTokenAdmin, controller.updateCiudad);
//Update sólo van a poder usarlo los usuarios ADMIN
router.delete('/:idciudad', authMiddleware.authenticateTokenAdmin, controller.destroyCiudad);
//Delete sólo van a poder usarlo los usuarios ADMIN



// EXPORTAR ROUTERS
module.exports = router;