/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();


const controller = require("../controllers/cuadros.controller");

//// AUTH ////
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

//// METODO GET  /////

// Para todos los cuadros
router.get('/', controller.allCuadros);

// Para un mensaje
router.get('/:idcuadro', controller.showCuadro);

//// METODO POST  ////
router.post('/',authMiddleware.authenticateToken ,upload.single('imagen'), controller.storeCuadro);

//// METODO PUT  ////
router.put('/:idcuadro', authMiddleware.authenticateToken ,controller.updateCuadro);

//// METODO DELETE ////
router.delete('/:idcuadro', authMiddleware.authenticateTokenAdmin ,controller.destroyCuadro);

// EXPORTAR ROUTERS
module.exports = router;