const express = require("express");
const router = express.Router();

//// AUTH ////
const authMiddleware = require("../middleware/auth.middleware");



router.get('/',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminintro.html',{user: req.user})});
router.get('/paises',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminpaises.html',{user: req.user})});
router.get('/ciudades',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminciudades.html',{user: req.user})});




// EXPORTAR ROUTERS
module.exports = router;