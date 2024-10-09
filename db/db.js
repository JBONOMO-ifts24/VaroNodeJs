const mysql = require("mysql2");

//// CONEXION A LA BBDD ////
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "bonomo",
    database : "varobase"
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la Base de Datos de Remedios Varo!");
});

// EXPORTAR DEL MODULO LA FUNCION CONNECTION
module.exports = connection;