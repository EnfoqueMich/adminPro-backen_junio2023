// /api/categoria


//importamos el router para poder configurar nuestras rutas
const {Router} = require('express');

//importamos para validar los campos
const { check } = require('express-validator');

//importamos el middleware para validar los campos
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar.jwt');
const { crearCategoria, actualizarCategoria, borrarCategoria, getCategorias } = require('../controllers/categoria');



const router = Router();


router.get( '/', validarJWT , getCategorias );

router.post( '/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre de la Categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria 
);

router.put( '/:id', 
    [],
    actualizarCategoria 
);

router.delete( '/:id', 
    
    borrarCategoria 
);




//exportamos el router para poder utlizarlo en otros lugares
module.exports = router;