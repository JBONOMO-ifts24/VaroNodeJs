const express = require("express");
const router = express.Router();

//// AUTH ////
const authMiddleware = require("../middleware/auth.middleware");



router.get('/',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminintro.html',{user: req.user , imagen: req.imagen})});
router.get('/paises',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminpaises.html',{user: req.user, imagen: req.imagen})});
router.get('/ciudades',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminciudades.html',{user: req.user, imagen: req.imagen})});
router.get('/pintores',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminpintores.html',{user: req.user , imagen: req.imagen})});
router.get('/cuadros',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('admincuadros.html',{user: req.user, imagen: req.imagen})});
router.get('/mensajes',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminmensajes.html',{user: req.user, imagen: req.imagen})});
router.get('/usuarios',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminusuarios.html',{user: req.user, imagen: req.imagen})});
router.get('/roles',authMiddleware.authenticateTokenAdminPag, (req,res) => {res.render('adminroles.html',{user: req.user, imagen: req.imagen})})

// EXPORTAR ROUTERS
module.exports = router;