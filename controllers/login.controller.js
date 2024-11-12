const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db");
const dotenv = require('dotenv');
dotenv.config();



//Ruta de registro.

const register = (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    let archivo_foto = "";
    if (req.file) {
        archivo_foto = req.file.filename;
      }
      console.log(hashedPassword);
  
    const query = 'INSERT INTO usuarios (username, email, password, archivo_foto) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword,archivo_foto], (err, results) => {
        console.log(results);
        console.log(err);
        if (err) return res.status(500).send({status:"Error",message:"Surgió un error"});
        res.status(201).send({status:"ok",mensaje:`Usuario ${username} agregado`,redirect:"/"});
    });

};


  

const login = (req, res) => {
    
        const { username, password } = req.body;
      
        const query = 'SELECT * FROM usuarios WHERE username = ?';
        db.query(query, [username], (err, results) => {
          if (err) return res.status(500).send('Error en el servidor');
          if (results.length === 0) return res.status(404).send('Usuario no encontrado');
      
          const user = results[0];
          console.log(user);
          const isPasswordValid = bcrypt.compareSync(password, user.password);
      
          //if (!isPasswordValid) return res.status(401).send('Contraseña incorrecta');
          if (!isPasswordValid) return res.redirect('login');
      
          const token = jwt.sign({ id: user.idusuarios, username: user.username}, process.env.SECRET_KEY, { expiresIn: '1h' });
          //res.status(200).send({ token });
          res.cookie('token', token, { httpOnly: true }); res.render('index.html', {user: username, loggedIn: true});
        });
};

const loginAPI = (req, res) => {
    
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) return res.status(500).send('Error en el servidor');
      if (results.length === 0) return res.status(404).send('Usuario no encontrado');
  
      const user = results[0];
      console.log(user);
      const isPasswordValid = bcrypt.compareSync(password, user.password);
  
      
      if (!isPasswordValid) return res.status(401).send('Contraseña incorrecta');
  
      const token = jwt.sign({ id: user.idusuarios, username: user.username}, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).send({ token });
    });
};


// Para mostrar todos los usuarios
const allUsuarios = (req, res) => {
    const sql = "SELECT idusuarios as id , username, email, archivo_foto FROM usuarios;";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un usuario
const showUsuario = (req, res) => {
    const {idusuario} = req.params;
    console.log(idusuario);
    const sql = "SELECT username, email, archivo_foto FROM usuarios WHERE idusuarios = ?";
    db.query(sql,[idusuario], (error, rows) => {
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


//// METODO PUT - Se va a poder modificar el mail y la contraseña -- Sólo van a poder los admin.  ////
const updateUsuario = (req, res) => {
    const {idusuario} = req.params;
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql ="UPDATE usuarios SET email = ?, password = ?  WHERE idusuarios = ?";
    db.query(sql,[email, hashedPassword, idusuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
        };
        
        const mens = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(mens); // mostrar el elmento que existe
    });     
};


//// METODO DELETE --Sólo van a poder los usuarios admin. ////
const destroyUsuario = (req, res) => {
    const {idusuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE idusuarios = ?";
    db.query(sql,[idusuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a borrar no existe"});
        };
        res.json({mesaje : "Usuario Eliminado"});
    }); 
};


module.exports = {
    register,
    login,
    loginAPI,
    allUsuarios, 
    showUsuario,
    destroyUsuario, 
    updateUsuario
};