const express = require("express");
const app = express();


app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const mensajesRouter = require('./routers/mensajesRouter');
const cuadrosRouter = require('./routers/cuadrosRouter');
const paisesRouter = require('./routers/paisesRouter');
const ciudadesRouter = require('./routers/ciudadesRouter');
const pintoresRouter = require('./routers/pintoresRouter');

app.use('/mensajes', mensajesRouter);
app.use('/cuadros', cuadrosRouter);
app.use('/paises', paisesRouter);
app.use('/ciudades', ciudadesRouter);
app.use('/pintores', pintoresRouter);
// Siempre que me refiera a mensajes o cuadros le coloco el prefijo.

app.use("/auth", require("./routers/loginRouter"));


app.get("/", (req, res) => {
    res.send("Hola VaroFans!!, pueden consultar sus mensajes en /mensajes. Si quieren ver cuadros de Remedios o sus colegas vayan a /cuadros. El logueo se hace en auth.");
});
// Esta es la ruta principal del proyecto "/"

app.listen(process.env.PORT, ()=> console.log(`Vamo que arrancamo en http://localhost:${process.env.PORT}`));