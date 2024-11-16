/// CONTROLADORES DEL MODULO ///

// Campos de la tabla pintores
// idpintores
// nombre_pintor
//fecha_nac
//fecha_mue
//lugar_nac
//biograf_pintor


const db = require("../db/db");


//// METODO GET  /////

// Para todos las ciudades
const allPintores = (req, res) => {
    const sql = "SELECT pintores.idpintores, pintores.nombre_pintor, pintores.fecha_nac, pintores.fecha_mue, ciudades.nombre as lugar_nac, paises.nombre as pais_nac, pintores.biograf_pintor  FROM pintores INNER JOIN ciudades ON pintores.lugar_nac = ciudades.idciudades INNER JOIN paises ON ciudades.pais = paises.idpaises";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showPintor = (req, res) => {
    const {idpintor} = req.params;
    console.log(idpintor);
    const sql = "SELECT pintores.idpintores, pintores.nombre_pintor, pintores.fecha_nac, pintores.fecha_mue, ciudades.nombre as lugar_nac, paises.nombre as pais_nac, pintores.biograf_pintor  FROM pintores INNER JOIN ciudades ON pintores.lugar_nac = ciudades.idciudades INNER JOIN paises ON ciudades.pais = paises.idpaises WHERE idpintores = ? ";
    db.query(sql,[idpintor], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor."});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el pintor."});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storePintor = (req, res) => {
    const {nombre_pintor, fecha_nac,fecha_mue,biograf_pintor, ciudad} = req.body;

    const sqla = "SELECT idciudades FROM ciudades WHERE nombre = ?";
    const sql = "INSERT INTO pintores (nombre_pintor,fecha_nac, fecha_mue, lugar_nac, biograf_pintor) VALUES (?,?,?,?,?)";
    db.query(sqla,[ciudad], (error, resul) => {
        console.log(resul[0].idpaises);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        
        db.query(sql,[nombre_pintor,fecha_nac,fecha_mue,resul[0].idciudades,biograf_pintor], (error, result) => {
            if(error){
                return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
            }
            const mensaje = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
            res.status(201).json(mensaje); // muestra creado con éxito el elemento
        });
        
    
    });     

};

//// METODO PUT  ////
const updatePintor = (req, res) => {
    const {idpintor} = req.params;
    const {nombre_pintor, fecha_nac,fecha_mue,biograf_pintor, ciudad} = req.body;
    const sql ="UPDATE pintores SET nombre_pintor = ? fecha_nac =? fecha_mue = ? lugar_nac = ? biograf_pintor = ? WHERE idpintores = ?";
    db.query(sql,[nombre_pintor,fecha_nac,fecha_mue,ciudad,biograf_pintor,idpintor], (error, result) => {
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
const destroyPintor = (req, res) => {
    const {idciudad} = req.params;
    const sql = "DELETE FROM pintores WHERE idpintores = ?";
    db.query(sql,[idciudad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El pintor a borrar no existe"});
        };
        res.json({mesaje : "Pintor Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allPintores,
    showPintor,
    storePintor,
    updatePintor,
    destroyPintor
};