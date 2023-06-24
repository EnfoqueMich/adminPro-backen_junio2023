//importamos el router para poder configurar nuestras rutas
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar.jwt');
const { getTodo } = require('../controllers/busquedas');

const router = Router();




router.get('/:busqueda', validarJWT , getTodo  )







//exportamos el router para poder utlizarlo en otros lugares
module.exports = router;