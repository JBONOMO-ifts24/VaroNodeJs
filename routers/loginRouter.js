/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controllers/login.controller");
const authMiddleware = require("../middleware/auth.middleware");

//// MULTER ////
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); // esta carpeta debe existir en el proyecto (raíz)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});


//// METODO POST  PARA LOGIN Y REGISTER ////
router.post('/register',upload.single('imagen'), controller.register);
router.post('/loginAPI', controller.loginAPI);
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

//MÉTODO de LOGOUT
router.get('/logout', (req, res) => { res.clearCookie('token'); res.redirect('/') });

router.get('/check-auth',authMiddleware.authenticateTokenPagina, (req, res) => {res.status(200).send({status:"ok",token:req.cookies.token})});

//ROLES 
router.get('/roles', (req,res) => authMiddleware.authenticateTokenAdmin, controller.allRoles);
router.post('/roles', (req,res) => authMiddleware.authenticateTokenAdmin, controller.agregarRoles);


// EXPORTAR ROUTERS
module.exports = router;