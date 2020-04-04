if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const db = require('./index')

db.init()
exports.paises =  ()=>{
    const sql_sentence = `
        SELECT id,
        "Country_Region" as pais,
        "Last_Update" as fecha,
        "Confirmed" as confirmados,
        "Deaths" as muertes,
        "Recovered" as recuperados,
        st_asgeojson(geom) as geom from cases_country
    `
    return db.query(sql_sentence)
    
}