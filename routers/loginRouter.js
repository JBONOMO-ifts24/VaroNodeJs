/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/login.controller");
const authMiddleware = require("../middleware/auth.middleware");


//// METODO POST  PARA LOGIN Y REGISTER ////
router.post('/register', controller.register);
router.post('/login', controller.login);

router.get("/protected", authMiddleware.authenticateToken, (req, res) => {
    res.status(200).send(`Bienvenido usuario registrado!`);
});

//METODOS PARA VER, BAJA Y MODIFICACIÓN TABLA USUARIO
router.get("/usuarios",authMiddleware.authenticateToken, controller.allUsuarios);
router.get('/usuarios/:idusuario', authMiddleware.authenticateToken, controller.showUsuario);
router.put('/usuarios/:idusuario', authMiddleware.authenticateTokenAdmin, controller.updateUsuario);
//Update sólo van a poder usarlo los usuarios ADMIN
router.delete('/usuarios/:idusuario', authMiddleware.authenticateTokenAdmin, controller.destroyUsuario);
//Delete sólo van a poder usarlo los usuarios ADMIN



// EXPORTAR ROUTERS
module.exports = router;