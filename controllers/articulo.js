
const { response } = require ( 'express' );


const Articulo = require('../models/articulo');


const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'enfoque', 
    api_key: '725857692819438', 
    api_secret: 'msfprEtwmxr7506d3WmwLK5LL7A' 
}); 
 

 

//Listar las Articulos
const getArticulos = async (req, res = response) => {

    try {
        const articulos = await Articulo.find()
                                        .populate('usuario', 'nombre img')
                                        .populate('categoria', 'nombre img');

        res.json({
            ok: true,
            articulos
        });
    } catch (error) {
        // Manejo de errores
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener las categorías'
        });
    }
}




//CREAR las Articulo
const crearArticulo = async (req, res = response) => {



    
      
      







    const uid = req.uid;
    const articulo = new Articulo({
        usuario:uid,
        ...req.body
    });
    

    try {

        const articuloDB = await articulo.save();

        res.json({
            ok: true,
            articulo: articuloDB
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

//Listar las Articulo
const actualizarArticulo = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarArticulo'
    });
}

//Listar las Articulo
const borrarArticulo = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarArticulo'
    });
}

module.exports = {
    getArticulos,
    crearArticulo,
    actualizarArticulo,
    borrarArticulo,
    
}
