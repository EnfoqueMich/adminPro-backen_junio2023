// /api/articulo
//importamos el router para poder configurar nuestras rutas
const {Router} = require('express');

//importamos para validar los campos
const { check } = require('express-validator');
//importamos el middleware para validar los campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar.jwt');

const { crearArticulo, actualizarArticulo, borrarArticulo, getArticulos } = require('../controllers/articulo');

const router = Router();

router.get( '/', validarJWT , getArticulos );

router.post( '/', 
    [
        validarJWT,
        check( 'titulo', 'Un título es obligatorio').not().isEmpty(),
        check( 'categoria', 'El id de la categoria no es válido').isMongoId(),
        validarCampos

    ],
    crearArticulo 
);

router.put( '/:id', 
    [],
    actualizarArticulo 
);

router.delete( '/:id', 
    
    borrarArticulo 
);

//exportamos el router para poder utlizarlo en otros lugares
module.exports = router;