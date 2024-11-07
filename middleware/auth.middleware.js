const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../db/db");


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
};

const authenticateTokenPagina = (req, res, next) => {
  const authHeader = req.headers["cookie"];
  console.log(req.headers['cookie']);
  const token = req.cookies.token ;
  console.log(token);
  if (!token) return res.redirect('/auth/login');

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
};


const authenticateTokenAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded); // Imprime el contenido decodificado del token
    const sql =
      "SELECT * FROM roles_usuarios WHERE id_usuarios = ? AND id_roles = 1;";
    const usuario = decoded.id;
    db.query(sql, [usuario], (error, result) => {
      console.log(result);
      if (error) {
        return res
          .status(500)
          .json({ error: "ERROR: Intente más tarde por favor" });
      }
      if (result.affectedRows == 0) {
        return res
          .status(404)
          .send({
            error: "ERROR: El Usuario no se encontró o no tiene permisos ADMIN",
          });
      }
      console.log("Admin Autorizado!!!");
      next();
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('El token ha expirado');
      return res
          .status(404)
          .send({
            error: "Token está vencido!!!",
          });

    } else {
      console.error('Error al verificar el token:', err);
      return res
          .status(404)
          .send({
            error: "ERROR: El Usuario no se encontró o no tiene permisos ADMIN",
          });
    }
  }
};

module.exports = { authenticateToken, authenticateTokenAdmin,authenticateTokenPagina,};
