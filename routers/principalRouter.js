const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../db/db");

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
// EXPORTAR ROUTERS
module.exports = router;
