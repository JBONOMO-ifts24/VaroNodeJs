/// CONTROLADORES DEL MODULO ///

// Campos de la tabla cuadros:
// idcuadros
// nombre_cuadro
// pintor
// ano_realizado
// nombre_archivo


const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allCuadros = (req, res) => {
    const sql = "SELECT * FROM cuadros";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un Cuadro
const showCuadro = (req, res) => {
    console.log(req.params);
    const {idcuadro} = req.params;
    console.log(idcuadro);
    const sql = "SELECT * FROM cuadros WHERE idcuadros = ?";
    db.query(sql,[idcuadro], (error, rows) => {
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
const storeCuadro = (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let nombre_archivo = "";

    if(req.file){
        nombre_archivo = req.file.filename;
    };

    const {nombre_cuadro, pintor, ano_realizado} = req.body;

    const sql = "INSERT INTO cuadros (nombre_cuadro, pintor, ano_realizado, nombre_archivo) VALUES (?,?,?,?)";

    db.query(sql,[nombre_cuadro, pintor, ano_realizado, nombre_archivo], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const cuadro = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(cuadro); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateCuadro = (req, res) => {
    console.log(req.params);
    const {idcuadro} = req.params;
    console.log(idcuadro);
    const {nombre_cuadro, pintor, ano_realizado} = req.body;
    console.log(idcuadro);
    const sql ="UPDATE cuadros SET nombre_cuadro = ?, pintor = ?, ano_realizado = ? WHERE idcuadros = ?";
    db.query(sql,[nombre_cuadro, pintor, ano_realizado, idcuadro], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El cuadro a modificar no existe"});
        };
        
        const cuadro = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(cuadro); // mostrar el elemento que existe
    });     
};


//// METODO DELETE ////
const destroyCuadro = (req, res) => {
    console.log(req.params);
    const {idcuadro} = req.params;
    console.log(idcuadro);
    const sql = "DELETE FROM cuadros WHERE idcuadros = ?";
    db.query(sql,[idcuadro], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El cuadro a borrar no existe"});
        };
        res.json({mesaje : "Cuadro Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allCuadros,
    showCuadro,
    storeCuadro,
    updateCuadro,
    destroyCuadro
};