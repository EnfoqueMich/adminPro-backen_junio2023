const { response } = require ('express');

//Importamos el modelo Usuario
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { generarJWT } = require('../helpers/jwt');

//creamos un controlador para obtener un listado de todos los usuarios de la base de datos
const getUsuarios = async(req, res) => {


    const usuarios = await Usuario.find( {}, 'nombre email role'); 

    res.json({
        ok: true,
        usuarios
    });
}

//creamos un controlador para crear un usuario en la base de datos
const crearUsuario =  async(req, res = response) => {

    //obtenemos los datos de la request
    const { email, password, nombre } = req.body;

    try {

        //buscamos si existe el email con .findOne
        const existeEmail = await Usuario.findOne({ email });

        //una condicion si existe el email
        if (existeEmail) {
            //envia un error status 400
            return res.status(400).json({
                ok: false,
                //mensaje enviado en caso de que ya este el correo registrado
                msg: 'El correo ya esta registrado'
            });
        }

        //con esto ya tenemos una instancia que tiene los datos de req.body
        const usuario = new Usuario(req.body);


        //Encriptar la contraseña antes de guardar en base de datos
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);





        //ahora vamos a guardar en la base de datos
        //y ponemos await antes para que primero guarde el usario y despues siga con la tarea siguiente
        //tenemos que poner en el inicio de la constante:    crearUsuario = async     para que funcione el: await
        await usuario.save();

         // Generar TOKEN - JWT
         const token = await generarJWT ( usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar codigo'
        });
    }
}



const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

        try {

            const usuarioDB = await Usuario.findById( uid );

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario con este id'
                });
            }

            //campos eliminados para no actualizarlos.
            const { password, email, ...campos } = req.body;

            if ( usuarioDB.email !== email ) {
            
                const existeEmail = await Usuario.findOne({ email });
                if (existeEmail) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un usuario con ese correo'
                    });
                }
            }
            campos.email = email;
            const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

            res.json({
                ok: true,
                usuario: usuarioActualizado
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado'
            });
        }

    
}






//BORRAR USUARIO 
const borrarUsuario = async(req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById ( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete ( uid );

        res.json ({
            ok: true,
            msg: 'Usuario Eliminado con exito'
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
    getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario,
}