const express = require('express')
const {paises} = require('../db/covidApi')
const api = express.Router()
const togeojson = require('./togeojson')

api.get('/paises',async (req,res)=>{
    const results = await paises()

    res.json(togeojson(results.rows))
})

module.exports = api