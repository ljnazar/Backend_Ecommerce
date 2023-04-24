const express = require('express')
const { fork } = require('child_process')
const path = require('path')

const app = express()

function calculoLento() {
    let sum = 0
    for (let i = 0; i < 8e9; i++) { 
        sum += i
    }
    return sum
}

let visitas = 0

app.get('/', (req, res) => {
    let pid = process.pid;
    res.json({ visitas: ++visitas, pid })
})

app.get('/bloqueante', (req, res) => { 
    const resultado = calculoLento() 
    res.json({ resultado })
})

app.get('/no-bloqueante', (req, res) => {
    const computo = fork(path.resolve(__dirname, 'child-process.js'))
    computo.send('start')
    computo.on('message', resultado => {
        res.json({ resultado })
    })
})

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto`)
})
    
server.on('error', err => { console.log(`Error en servidor: ${err}`) })
