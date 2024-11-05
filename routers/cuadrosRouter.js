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
    limits: { fileSize: 1024 * 1024 * 1 }, // 1 MB
    fileFilter: (req, file, cb) => {
        console.log('upload');
        console.log(file);
        console.log(file.size);
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && extname) {
            return cb(null, true);
        }
        cb("Tipo de archivo no soportado o de tamaño mayor a 1 MB");
    },
})

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