const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema ({

    fecha: {
        type: String
    },
    reportero: {
        type: String
    },
    
    balazo: {
        type: String
    },
    titulo: {
        type: String,
        required: true
    },

    sumario_1: {
        type: String
    },
    sumario_2: {
        type: String
    },

    parrafo_1: {
        type: String
    },
    parrafo_2: {
        type: String
    },
    parrafo_3: {
        type: String
    },
    parrafo_4: {
        type: String
    },

    img_url_1: {
        type: String
    },

    img_1: {
        type: String
    },
    img_2: {
        type: String
    },
    img_3: {
        type: String
    },
    img_4: {
        type: String
    },
    img_5: {
        type: String
    },
    img_6: {
        type: String
    },

    video_youtube: {
        type: String
    },

    post_redsocial_1: {
        type: String
    },
    post_redsocial_2: {
        type: String
    },

    usuario: {
        //con esto inidicamos que tendremos una refencia
        //con el modelo Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    categoria: {
        //con esto inidicamos que tendremos una refencia
        //con el modelo Categoria
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },



   //ponemos el nombre excacto para la base de datos
}, { collection: 'articulo' });

ArticuloSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model ( 'Articulo', ArticuloSchema);