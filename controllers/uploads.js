const { response } = require('express');
const fs = require('fs');

const path = require('path');

const Usuario = require('../models/usuario');

const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ['articulos', 'usuarios'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'Selecciona un artículo o categoría que exista',
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningún archivo para subir',
    });
  }

  const file = req.files.imagen;
  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'Este tipo de archivo no está permitido subir',
    });
  }

  const nombreArchivo = `${uuidv4()}_enfoque_de_Michoacan.${extensionArchivo}`;
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  file.mv(path, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen',
      });
    }

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(path);
      console.log(cloudinaryResponse);
      const imagenUsuario = cloudinaryResponse.secure_url;

      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('El usuario no existe');
        fs.unlinkSync(path); // Eliminar archivo local
        return res.status(400).json({
          ok: false,
          msg: 'El usuario no existe',
        });
      }

      if (usuario.img) {
        const nombreArr = usuario.img.split('/');
        const public_id = nombreArr[nombreArr.length - 1].split('.')[0];
        cloudinary.uploader.destroy(public_id);
      }

      usuario.img = imagenUsuario;
      await usuario.save();

      fs.unlinkSync(path); // Eliminar archivo local

      res.json({
        ok: true,
        msg: 'Archivo subido',
        imagenUsuario,
      });
    } catch (error) {
      console.error(error);
      fs.unlinkSync(path); // Eliminar archivo local
      return res.status(500).json({
        ok: false,
        msg: 'Error al subir la imagen',
      });
    }
  });
};


const retornaImagen = async (req, res) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      console.log('El usuario no existe');
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const imagenUsuario = usuario.img;
    if (!imagenUsuario) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no tiene una imagen asociada',
      });
    }

    res.redirect(imagenUsuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener la imagen',
    });
  }
};







module.exports = {
  fileUpload, 
  retornaImagen,
};
