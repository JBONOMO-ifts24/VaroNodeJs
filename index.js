const express = require("express");
const app = express();


app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const mensajesRouter = require('./routers/mensajesRouter');
const cuadrosRouter = require('./routers/cuadrosRouter');
app.use('/mensajes', mensajesRouter);
app.use('/cuadros', cuadrosRouter);
// Siempre que me refiera a mensajes o cuadros le coloco el prefijo.


app.get("/", (req, res) => {
    res.send("Hola VaroFans!!, pueden consultar sus mensajes en /mensajes, si quieren ver cuadros de Remedios o sus colegas vayan a /cuadros");
});
// Esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Vamo que arrancamo en http://localhost:${PORT}`));