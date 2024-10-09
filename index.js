const express = require("express");
const app = express();

app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const mensajesRouter = require('./routers/mensajesRouter');
app.use('/mensajes', mensajesRouter);
// Siempre que me refiera a mensajes le coloco el prefijo


app.get("/", (req, res) => {
    res.send("Hola VaroFans!!, pueden consultar sus mensajes en /mensajes");
});
// Esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Vamo que arrancamo en http://localhost:${PORT}`));