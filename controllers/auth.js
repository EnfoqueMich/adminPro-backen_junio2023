const { response } = require ('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { generarJWT } = require('../helpers/jwt');




const login = async ( req, res = response ) => {

    //obtenemos el correo y password del body
    const { email, password } = req.body;

    try {

        // Verificar correo
        const usuarioDB = await Usuario.findOne({ email });

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Correo no encontrado'
                }); 
            }

        // Verificacamos que la contraseña escrita sea la misma que esta en la base de datos.
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

            if (!validPassword) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Contraseña no válida'
                });
            }

        // Generar TOKEN - JWT
        const token = await generarJWT ( usuarioDB.id);


        res.json({ 
            ok: false,
            token
        });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }




}


module.exports = {
    login,
}