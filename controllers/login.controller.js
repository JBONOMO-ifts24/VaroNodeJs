const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user.models");
const users = require("../models/user.models");
const db = require("../db/db");

const SECRET_KEY = 'tu_secreta_llave';


//Ruta de registro.

const register = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(username);
    console.log(email);
    console.log(hashedPassword);
  
    const query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
        console.log(results);
        console.log(err);
        if (err) return res.status(500).send('Error en el servidor');
        res.status(201).send('Usuario registrado');
    });

};

  

const login = (req, res) => {
    
        const { username, password } = req.body;
      
        const query = 'SELECT * FROM usuarios WHERE username = ?';
        db.query(query, [username], (err, results) => {
          if (err) return res.status(500).send('Error en el servidor');
          if (results.length === 0) return res.status(404).send('Usuario no encontrado');
      
          const user = results[0];
          const isPasswordValid = bcrypt.compareSync(password, user.password);
      
          if (!isPasswordValid) return res.status(401).send('Contraseña incorrecta');
      
          const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
          res.status(200).send({ token });
        });
};


module.exports = {
    register,
    login,
};