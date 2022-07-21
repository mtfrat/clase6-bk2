const fs = require('fs')
const express = require('express')

const app = express()

class Contenedor {

    constructor(archivo){
        this.archivo = archivo
    }

    getAll(){
        let objetosEnArchivo = []
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        for(let i in dataObj){
            objetosEnArchivo.push(dataObj[i])
        }
        return objetosEnArchivo
    }

    getRandomProduct(){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)

        let random = Math.floor(Math.random() * 2)
        for(let i in dataObj){
            if(dataObj[i].id === random)
                return(dataObj[random])
        }
    }


}

const connectedServer = app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})

app.get('/', (req,res)=>{
    let contenedor1 = new Contenedor("productos.txt")
    res.send(contenedor1.getAll())
})

app.get('/productoRandom', (req,res)=>{
    let contenedor2 = new Contenedor("productos.txt")
    res.send(contenedor2.getRandomProduct())
})





