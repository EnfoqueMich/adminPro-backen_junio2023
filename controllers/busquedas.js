

const { response } = require ('express');


//al importar modelo, tiene que estar sin parentesis
const Articulo = require( '../models/articulo');
const Categoria = require( '../models/categoria');



const getTodo = async (req, res = response) => {
    try {
      
        const busqueda = req.params.busqueda;
      const regex = new RegExp(busqueda, 'i');

        const [ articulos, categorias ] = await Promise.all ([

            Articulo.find({ titulo: regex }),
            Categoria.find({ nombre: regex })

        ]);

        res.json({
            ok: true,
            articulos,
            categorias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error en el servidor'
        });
    }
  };
 



module.exports = {

    getTodo,
}