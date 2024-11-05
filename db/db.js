const mysql = require("mysql2");
require('dotenv').config();

//// CONEXION A LA BBDD ////
const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la Base de Datos de Remedios Varo!");
});

// EXPORTAR DEL MODULO LA FUNCION CONNECTION
module.exports = connection;