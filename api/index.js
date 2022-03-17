const express = require("express");
const { paises, paisesComoPoligonos } = require("../db/covidApi");
const {
  estados,
  listEstados,
  tornadosPorEstadoId,
  tornadosPorDibujo
} = require("../db/tornadosApi");
const api = express.Router();
const togeojson = require("../utils/togeojson");

api.get("/paises", async (req, res) => {
  const results = await paises();

  res.json(togeojson(results.rows));
});
api.get("/paises/poly", async (req, res) => {
  const results = await paisesComoPoligonos();
  res.json(togeojson(results.rows));
});
api.get("/tornados/estados", async (req, res, next) => {
  try {
    const results = await estados();
    res.json(togeojson(results.rows));
  } catch (error) {
    next(error);
  }
});
api.get("/tornados/listEstados", async (req, res) => {
  const results = await listEstados();
  res.json({ rowCount: results.rowCount, content: results.rows });
});
api.get("/tornados/:estadoId", async (req, res) => {
  const { estadoId } = req.params;
  const results = await tornadosPorEstadoId(estadoId);
  res.json({ rowCount: results.rowCount, content: togeojson(results.rows) });
});

api.post('/tornados/select',async (req, res) => {
  const results = await tornadosPorDibujo(req.body);
  res.json({ rowCount: results.rowCount, content: togeojson(results.rows) });

})

module.exports = api;
