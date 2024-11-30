const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../db/db");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("index.html", { loggedIn: false, admin:false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.render("index.html", { loggedIn: false ,admin: false});
    } else {
      try {
        const sql =
          "SELECT * FROM roles_usuarios WHERE id_usuarios = ? AND id_roles = 1;";
        const usuario = user.id;
        db.query(sql, [usuario], (error, result) => {
          console.log(result);
          if (error) {
            return res
              .status(500)
              .json({ error: "ERROR: Intente más tarde por favor" });
          }
          if (result.length < 1) {
            return res.render("index.html", {
              loggedIn: true,
              user: user.username,
              admin: false,
            });
          }
          console.log("Admin Autorizado!!!");
          return res.render("index.html", {
            loggedIn: true,
            user: user.username,
            admin: true,
          });
        });
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          console.error("El token ha expirado");
          return res.status(404).send({
            error: "Token está vencido!!!",
          });
        } else {
          console.error("Error al verificar el token:", err);
          return res.status(404).send({
            error: "ERROR: El Usuario no se encontró o no tiene permisos ADMIN",
          });
        }
      }
    }
  });
});

router.get("/muro", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("muro.html", { loggedIn: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.render("muro.html", { loggedIn: false });
    } else {
      return res.render("muro.html", {
        loggedIn: true,
        user: user.username,
      });
    }
  });
});

router.get("/api", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("api.html", { loggedIn: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.render("api.html", { loggedIn: false });
    } else {
      return res.render("api.html", {
        loggedIn: true,
        user: user.username,
      });
    }
  });
});

router.get("/obra", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("obra.html", { loggedIn: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.render("obra.html", { loggedIn: false });
    } else {
      return res.render("obra.html", {
        loggedIn: true,
        user: user.username,
      });
    }
  });
});

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.get("/links", (req, res) => {
  res.render("links.html");
});
router.get("/bio", (req, res) => {
  res.render("bio.html");
});
// EXPORTAR ROUTERS
module.exports = router;
