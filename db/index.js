if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const {Pool} = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

const db = {
    query: sqlsentence =>{
        return pool.query(sqlsentence)
    },
    init: async ()=>{
        const test_query = `
            SELECT NOW()
        `
        const result = await db.query(test_query)
        console.log(result.rows)
    }
}

module.exports = db;