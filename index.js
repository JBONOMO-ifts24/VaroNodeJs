const express = require("express");
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true })); app.use(cors());
app.use(cookieParser());


app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

// Configura Nunjucks 
nunjucks.configure('views', { autoescape: true, express: app });

app.use('/public', express.static(path.join(__dirname, 'public')));


const mensajesRouter = require('./routers/mensajesRouter');
const cuadrosRouter = require('./routers/cuadrosRouter');
const paisesRouter = require('./routers/paisesRouter');
const ciudadesRouter = require('./routers/ciudadesRouter');
const pintoresRouter = require('./routers/pintoresRouter');
const principalRouter = require('./routers/principalRouter');

app.use('/mensajes', mensajesRouter);
app.use('/cuadros', cuadrosRouter);
app.use('/paises', paisesRouter);
app.use('/ciudades', ciudadesRouter);
app.use('/pintores', pintoresRouter);
app.use('',principalRouter);
// Siempre que me refiera a mensajes o cuadros le coloco el prefijo.

app.use("/auth", require("./routers/loginRouter"));


//app.get("/", (req, res) => {
//    res.render('index.html', { title: 'Página principal - Remedios Varo' });
//});
// Esta es la ruta principal del proyecto "/"

app.listen(process.env.PORT, ()=> console.log(`Vamo que arrancamo en http://localhost:${process.env.PORT}`));