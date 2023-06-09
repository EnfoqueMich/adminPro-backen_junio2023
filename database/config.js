const mongoose = require('mongoose');

//creamos una función en cargada de ejectuarlo
const dbConnection = async() => {

    
    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log('Base de datos online, EXITO')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la bd ver logs');
    }


}

module.exports = {
    //exportamos la función para poder usarla en otro lado
    dbConnection
}