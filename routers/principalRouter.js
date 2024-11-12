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
    return res.render("index.html", { loggedIn: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) {
      return res.render("index.html", { loggedIn: false });
    } else {
      return res.render("index.html", {
        loggedIn: true,
        user: user.username,
      });
    }
  });
});


router.get("/muro",(req, res) => {
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


router.get("/api",(req, res) => {
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

router.get("/obra",(req, res) => {
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

router.get("/register",(req,res) => {
  res.render('register.html');
})

// EXPORTAR ROUTERS
module.exports = router;
