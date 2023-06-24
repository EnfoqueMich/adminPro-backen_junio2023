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

//midelware para la lectura y parseo de body
//es obligatorio tiene que ir antes de las RUTAS
app.use(express.json());


dbConnection();

 


//RUTAS
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/articulo', require('./routes/articulo') );
app.use( '/api/categoria', require('./routes/categoria') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );
 
//levantamos el puerto
app.listen(process.env.PORT, ()=> {

    console.log('Servidor corriendo en puerto' + process.env.PORT);

});