/// CONTROLADORES DEL MODULO ///

// Campos de la tabla paises
// idpaises
// nombre


const db = require("../db/db");


//// METODO GET  /////

// Para todos las peliculas
const allPaises = (req, res) => {
    const sql = "SELECT * FROM paises";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showPais = (req, res) => {
    const {idpais} = req.params;
    console.log(idpais);
    const sql = "SELECT * FROM paises WHERE idpaises = ?";
    db.query(sql,[idpais], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el país buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storePais = (req, res) => {
    const {nombre} = req.body;
    const sql = "INSERT INTO paises (nombre) VALUES (?)";
    db.query(sql,[nombre], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const mensaje = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(mensaje); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updatePais = (req, res) => {
    const {idpais} = req.params;
    const {nombre} = req.body;
    const sql ="UPDATE paises SET nombre = ? WHERE idpaises = ?";
    db.query(sql,[nombre,idpais], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El país a modificar no existe"});
        };
        
        const mens = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(mens); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyPais = (req, res) => {
    const {idpais} = req.params;
    const sql = "DELETE FROM paises WHERE idpaises = ?";
    db.query(sql,[idpais], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El país a borrar no existe"});
        };
        res.json({mesaje : "País Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allPaises,
    showPais,
    storePais,
    updatePais,
    destroyPais
};