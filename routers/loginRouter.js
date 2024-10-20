/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/login.controller");
const authMiddleware = require("../middleware/auth.middleware")


//// METODO POST  ////
router.post('/register', controller.register);
router.post('/login', controller.login);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Bienvenido usuario registrado!`);
});

// EXPORTAR ROUTERS
module.exports = router;