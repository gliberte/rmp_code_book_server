const db = require("./index");

exports.estados = () => {
  const sql_sentence = `
    SELECT us_states.id as id,
    name,
    region,
    ST_AsGeoJSON(us_states.geom) AS geom, 
    count(htornado_tracks.id)::integer as numtornados 
    from us_states,htornado_tracks 
    WHERE ST_INTERSECTS(htornado_tracks.geom,us_states.geom) 
    GROUP BY us_states.id,us_states.name,region,us_states.geom
    `;
  return db.query(sql_sentence);
};

exports.listEstados = () => {
  return db.query(`select id,name from us_states`);
};
exports.tornadosPorEstadoId = (estadoId) => {
  const sql_sentence = `
    SELECT mag,
    date,
    ST_AsGeoJSON(htornado_tracks.geom) AS geom
    from us_states,htornado_tracks 
    WHERE ST_INTERSECTS(htornado_tracks.geom,us_states.geom) AND us_states.id = $1
    `;

  return db.query({ text: sql_sentence, values: [estadoId] });
};

exports.tornadosPorDibujo = (jsongeo) => {
  const sql_sentence = `
    SELECT mag,
    date,
    ST_AsGeoJSON(htornado_tracks.geom) AS geom
    from htornado_tracks 
    WHERE ST_INTERSECTS(htornado_tracks.geom,
      ST_SetSRID(ST_GeomFromGeoJson($1),4326))
    `;

  return db.query({ text: sql_sentence, values: [jsongeo] });
};
