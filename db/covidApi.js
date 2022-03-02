

const db = require('./index')

db.init()
exports.paises =  ()=>{
    const sql_sentence = `
        SELECT id,
        country_region as pais,
        last_update as fecha,
        confirmed as confirmados,
        deaths as muertes,
        recovered as recuperados,
        st_asgeojson(geom) as geom from cases_country
    `
    return db.query(sql_sentence)
    
}

exports.paisesComoPoligonos = ()=>{
    const sql_sentence = `
        SELECT admin,
        "Confirmed" as confirmados,
        "Deaths" as muertes,
        "Recovered" as recuperados,
        ST_ASGeoJSON(ST_Simplify(countries.geom,0.1,false)) AS geom 
        FROM cases_country,countries WHERE ST_CONTAINS(countries.geom,cases_country.geom) 
        ORDER BY "Confirmed" DESC
    `
    return db.query(sql_sentence)
}