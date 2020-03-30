const express = require('express')

app.set('port',process.env.PORT)

const app = express()

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})

app.listen(app.get('port'),()=>{
    console.log(`App iniciado en el puerto ${app.get('port')}`);
})