const { response } = require ('express');
//Importamos el resultado de la validación
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next ) => {

    const errores = validationResult(req);
    //si errores no esta vacio
    if (!errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    //si pasa la validación podemos ejecutar
    //la siguiente petición por ello ponemos: next
    next();
}


//exportamos el modulo para reutilizarlo en otro lugar
module.exports = {
    validarCampos
}