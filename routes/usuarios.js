//importamos el router para poder configurar nuestras rutas
const {Router} = require('express');

//importamos para validar los campos
const { check } = require('express-validator');

//importamos el middleware para validar los campos
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar.jwt');

const router = Router();


router.get( '/', validarJWT , getUsuarios );

router.post( '/', 
    [
                      //No deve estar vacio
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
                    //Tiene que ser un email
        check('email', 'El correo es obligatorio').isEmail(),

        //tenemos que llamarlo siempre despues de los ckeck
        validarCampos,
    ],
    crearUsuario 
);

router.put( '/:id', 
    [
        validarJWT,
        //No deve estar vacio
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        //Tiene que ser un email
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),

        //tenemos que llamarlo siempre despues de los ckeck
        validarCampos,
    ],
    actualizarUsuario 
);

router.delete( '/:id', 
    validarJWT,
    borrarUsuario 
);




//exportamos el router para poder utlizarlo en otros lugares
module.exports = router;