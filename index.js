require('dotenv').config();

const express = require('express');
const cors = require('cors');

        

const { dbConnection } = require('./database/config');


//inicializamos la aplicación de express
const app = express();


//configurar CORS esto va despues de express
//Esto es un midelware que se ejecuta 
//para todas las líneas que siguen hacia abajo
//cada vez que se haga una petición
app.use(cors());

dbConnection();

 


//RUTAS
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg:"Hola mundo"
    });


});

 
//levantamos el puerto
app.listen(process.env.PORT, ()=> {

    console.log('Servidor corriendo en puerto' + process.env.PORT);

});