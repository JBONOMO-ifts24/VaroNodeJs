/// CONTROLADORES DEL MODULO ///

// Campos de la tabla cuadros:
// idcuadros
// nombre_cuadro
// pintor
// ano_realizado
// nombre_archivo

const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allCuadros = (req, res) => {
  const sql =
    "SELECT cuadros_v2.idcuadros_v2, cuadros_v2.nombre_cuadro , pintores.nombre_pintor as pintor ,cuadros_v2.ano_realizado, cuadros_v2.nombre_archivo, cuadros_v2.ubicacion_orig  FROM cuadros_v2 INNER JOIN pintores ON cuadros_v2.pintor = pintores.idpintores";
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows);
  });
};

// Para un Cuadro
const showCuadro = (req, res) => {
  console.log(req.params);
  const { idcuadro } = req.params;
  console.log(idcuadro);
  const sql =
    "SELECT cuadros_v2.idcuadros_v2, cuadros_v2.nombre_cuadro , pintores.nombre_pintor as pintor ,cuadros_v2.ano_realizado, cuadros_v2.nombre_archivo, cuadros_v2.ubicacion_orig  FROM cuadros_v2 INNER JOIN pintores ON cuadros_v2.pintor = pintores.idpintores WHERE idcuadros_v2 = ?";
  db.query(sql, [idcuadro], (error, rows) => {
    console.log(rows);
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" });
    }
    if (rows.length == 0) {
      return res
        .status(404)
        .send({ error: "ERROR: No existe el mensaje buscado" });
    }
    res.json(rows[0]);
    // me muestra el elemento en la posicion cero si existe.
  });
};

//// METODO POST  ////
const storeCuadro = (req, res) => {
  console.log(req.file);
  console.log(req.body);
  let nombre_archivo = "";

  if (req.file) {
    nombre_archivo = req.file.filename;
  }

  const { nombre_cuadro, pintor, ano_realizado, ubicacion_orig } = req.body;

  const sqla = "SELECT idpintores FROM pintores WHERE nombre_pintor = ?";
  const sql =
    "INSERT INTO cuadros_v2 (nombre_cuadro , pintor , ano_realizado, nombre_archivo, ubicacion_orig) VALUES (?,?,?,?,?)";
  db.query(sqla, [pintor], (error, resul) => {
    console.log(`nombre pintor: ${pintor}`);
    console.log(resul[0]);

    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" });
    }

    try {
      db.query(
        sql,
        [
          nombre_cuadro,
          resul[0].idpintores,
          ano_realizado,
          nombre_archivo,
          ubicacion_orig,
        ],
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "ERROR: Intente más tarde por favor" });
          }
          const mensaje = { ...req.body, id: result.insertId }; // ... reconstruir el objeto del body
          res.status(201).json(mensaje); // muestra creado con éxito el elemento
        }
      );
    } catch (err) {
      res.status(500).json({
        error:
          "ERROR: Ha ocurrido un problema inesperado. Intente más tarde por favor",
      });
    }
  });
};

//// METODO PUT  ////
const updateCuadro = (req, res) => {
  console.log(req.params);
  const { idcuadro } = req.params;
  console.log(idcuadro);
  const { nombre_cuadro, pintor, ano_realizado,ubicacion_orig } = req.body;
  console.log(pintor);
  const sql =
    "UPDATE cuadros_v2 SET nombre_cuadro = ?, pintor =? ,ano_realizado =? ,ubicacion_orig = ? WHERE idcuadros_v2 = ?";
  const sqla = "SELECT idpintores FROM pintores WHERE nombre_pintor = ?";
  try {
    db.query(sqla, [pintor], (error, resul) => {
      console.log(resul[0].idpintores);
      if (error) {
        return res
          .status(500)
          .json({ error: "ERROR: Intente más tarde por favor" });
      }

      db.query(
        sql,
        [nombre_cuadro, resul[0].idpintores, ano_realizado, ubicacion_orig,idcuadro],
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "ERROR: Intente más tarde por favor" });
          }
          if (result.affectedRows == 0) {
            return res
              .status(404)
              .send({ error: "ERROR: El cuadro a modificar no existe" });
          }
          const mensaje = { ...req.body, id: result.insertId }; // ... reconstruir el objeto del body
          res.status(201).json(mensaje); // muestra creado con éxito el elemento
        }
      );
    });
  } catch (err) {
    res.status(500).json({
      error:
        "ERROR: Ha ocurrido un problema inesperado. Intente más tarde por favor",
    });
  }
};

//// METODO DELETE ////
const destroyCuadro = (req, res) => {
  console.log(req.params);
  const { idcuadro } = req.params;
  console.log(idcuadro);
  const sql = "DELETE FROM cuadros_v2 WHERE idcuadros_v2 = ?";

  db.query(sql, [idcuadro], (error, result) => {
    console.log(result);
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    if (result.affectedRows == 0) {
      return res
        .status(404)
        .send({ error: "ERROR: El cuadro a borrar no existe" });
    }
    res.json({ mesaje: "Cuadro Eliminado" });
  });
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
  allCuadros,
  showCuadro,
  storeCuadro,
  updateCuadro,
  destroyCuadro,
};
