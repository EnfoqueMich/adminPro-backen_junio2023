
const { response } = require ( 'express' );



const Categoria = require('../models/categoria');

//Listar las categorias
const getCategorias = async (req, res = response) => {
    try {
        const categorias = await Categoria.find().populate('usuario', 'nombre img');

        res.json({
            ok: true,
            categorias
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


 
//CREAR las categoria
const crearCategoria = async (req, res = response) => {

    const uid = req.uid;
    const categoria = new Categoria({
        usuario:uid,
        ...req.body
    });
    

    try { 

        const categoriaDB = await categoria.save();

        res.json({
            ok: true,
            categoria: categoriaDB
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }


    
}

//Listar las categorias
const actualizarCategoria = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarCategoria'
    });
}

//Listar las categorias
const borrarCategoria = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarCategoria'
    });
}

module.exports = {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    
}
