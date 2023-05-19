const express = require('express')
const fetch = require('node-fetch')
const app = express()

let visitas = 0

app.get('/', (req, res) => {
    let pid = process.pid;
    res.json({ visitas: ++visitas, pid })
})

// Una consulta a una API externa no nos bloquea la app si se demora en responder

app.get('/consulta-API-lenta', async(req, res) => { 
    
    const sendData = await fetch('http://localhost:8080/bloqueante', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendData;

    res.json({ response })
})

const server = app.listen(3000, () => {
    console.log(`Servidor http escuchando en el puerto 3000`)
})
    
server.on('error', err => { console.log(`Error en servidor: ${err}`) })
