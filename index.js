const express = require('express')
const app = express()
const port = 5000
app.set('view engine', 'ejs');

app.use(express.static('static'))
app.listen(port, () => {
    console.log(`servidor en  http://localhost:${port}`)
})

//Configurar la base datos
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
})
sequelize.authenticate()
.then(()=>{
    console.log("conexion establecida");
})
.catch(err=>{
    console.log("error al conectarse");
})
//creación de modelo
const Experiencia = sequelize.define(
'experiencia',
    {
        puesto:Sequelize.STRING,
        empresa:Sequelize.STRING,
        descripcion:Sequelize.STRING,
        periodo: Sequelize.STRING
    }
);
//migración y poblado de data
// sequelize.sync({force:true})
// .then
// (
//     ()=>
//     {
//         console.log("BD y tabla creada")
//         Experiencia.bulkCreate(
//             [
//                 {puesto:'FullStack Developer',empresa:'INFOUNSA',descripcion:'Desarrolador FullStack Developer con React y Nodejs',periodo:'julio 2021 - actualidad '},
//                 {puesto:'Backend Developer',empresa:'FREELANCE',descripcion:'Desarrollando proyecto personales en Python con Django, NodeJS con Express',periodo:'junio 2021 - diciembre 2021 '},
//                 {puesto:'Frontend Developer',empresa:'FREELANCE',descripcion:'Desarrollando proyecto en React, Javascript',periodo:'junio 2021 - diciembre 2021 '},
//             ]).then(function(){
//                 return Experiencia.findAll();
//             }).then(function(experiencia){
//                 console.log(experiencia)
//             })
//     }
// )


app.get('/', (req, res) => {
    Experiencia.findAll()
    .then((exp)=>{
        console.log(exp)
        res.render('index',{
            experiencias: exp,
            tituloexp: 'EXPERIENCIAS LABORAL'
        })
    })
})