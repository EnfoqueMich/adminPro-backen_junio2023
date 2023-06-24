const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {

        //para que ninguna categoria se grave sin el usuario que lo creo
        required: true,
        //con esto inidicamos que tendremos una refencia
        //con el modelo Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

   //ponemos el nombre excacto para la base de datos
}, { collection: 'categoria' });

CategoriaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model ( 'Categoria', CategoriaSchema);