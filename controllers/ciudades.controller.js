/// CONTROLADORES DEL MODULO ///

// Campos de la tabla ciudades
// idciudades
// nombre
//pais


const db = require("../db/db");


//// METODO GET  /////

// Para todos las ciudades
const allCiudades = (req, res) => {
    const sql = "SELECT ciudades.idciudades, ciudades.nombre as ciudad, paises.nombre as pais FROM ciudades INNER JOIN paises ON ciudades.pais = paises.idpaises;";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showCiudad = (req, res) => {
    const {idciudad} = req.params;
    console.log(idciudad);
    const sql = "SELECT ciudades.idciudades, ciudades.nombre as ciudad, paises.nombre as pais FROM ciudades INNER JOIN paises ON ciudades.pais = paises.idpaises WHERE ciudades.idciudades = ?";
    db.query(sql,[idciudad], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la ciudad buscada"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeCiudad = (req, res) => {
    const {pais, ciudad} = req.body;

    const sqla = "SELECT idpaises FROM paises WHERE nombre = ?";
    const sql = "INSERT INTO ciudades (nombre,pais) VALUES (?,?)";
    db.query(sqla,[pais], (error, resul) => {
        console.log(resul[0].idpaises);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        
        db.query(sql,[ciudad,resul[0].idpaises], (error, result) => {
            if(error){
                return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
            }
            const mensaje = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
            res.status(201).json(mensaje); // muestra creado con éxito el elemento
        });
        
    
    });     

};

//// METODO PUT  ////
const updateCiudad = (req, res) => {
    const {idciudad} = req.params;
    const {nombre, pais} = req.body;
    const sql ="UPDATE ciudad SET nombre = ? pais =? WHERE idciudades = ?";
    db.query(sql,[nombre,pais,idciudad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La ciudad a modificar no existe"});
        };
        
        const mens = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(mens); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyCiudad = (req, res) => {
    const {idciudad} = req.params;
    const sql = "DELETE FROM ciudades WHERE idciudades = ?";
    db.query(sql,[idciudad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El país a borrar no existe"});
        };
        res.json({mesaje : "Ciudad Eliminada"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allCiudades,
    showCiudad,
    storeCiudad,
    updateCiudad,
    destroyCiudad
};