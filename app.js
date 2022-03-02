const express = require('express')
const cors = require('cors')
const app = express()



const api = require('./api')

app.set('port',process.env.PORT || 3000)

app.use(cors())
app.use('/api',api)
app.use((req,res)=>{
    res.status(404).json({
        mensaje:'Recurso no encontrado'
    })
})

app.listen(app.get('port'),()=>{
    console.log(`App iniciado en el puerto ${app.get('port')}`);
})