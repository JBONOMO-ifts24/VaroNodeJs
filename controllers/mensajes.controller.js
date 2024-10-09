/// CONTROLADORES DEL MODULO ///

// Campos de la tabla mensajes
// idmensajes
// nombre_usuario
// mensaje
// fecha_mensaje

const { NOW, Sequelize } = require("sequelize");
const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allMensajes = (req, res) => {
    const sql = "SELECT * FROM mensajes";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showMensaje = (req, res) => {
    const {idmensaje} = req.params;
    console.log(idmensaje);
    const sql = "SELECT * FROM mensajes WHERE idmensajes = ?";
    db.query(sql,[idmensaje], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el mensaje buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeMensaje = (req, res) => {
    const {nombre_usuario, mensaje} = req.body;
    const sql = "INSERT INTO mensajes (nombre_usuario, mensaje) VALUES (?,?)";
    db.query(sql,[nombre_usuario, mensaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const mensaje = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(mensaje); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateMensaje = (req, res) => {
    const {idmensaje} = req.params;
    const {mensaje, nombre_usuario} = req.body;
    const sql ="UPDATE mensajes SET mensaje = ?, nombre_usuario = ?  WHERE idmensajes = ?";
    console.log(idmensaje);
    console.log(mensaje);
    console.log(nombre_usuario);
    db.query(sql,[mensaje, nombre_usuario, idmensaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El mensaje a modificar no existe"});
        };
        
        const mens = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(mens); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyMensaje = (req, res) => {
    const {idmensaje} = req.params;
    const sql = "DELETE FROM mensajes WHERE idmensajes = ?";
    db.query(sql,[idmensaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El mensaje a borrar no existe"});
        };
        res.json({mesaje : "Mensaje Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allMensajes,
    showMensaje,
    storeMensaje,
    updateMensaje,
    destroyMensaje
};