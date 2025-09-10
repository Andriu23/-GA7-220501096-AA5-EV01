const ModelProducto = require('../models/productos');

const productoCtrl = {};

/**
 * ========================
 *   Rutas CRUD Usuarios
 * ========================
 */

// Crear usuario (sin encriptar, para pruebas generales del CRUD)
productoCtrl.createProducto = async (req, res) => {
    const body = req.body;
    const respuesta = await ModelProducto.create(body);
    res.send(respuesta);
};

// Consultar todos los usuarios
productoCtrl.getProducto = async (req, res) => {
    const respuesta = await ModelProducto.find({});
    res.send(respuesta);
};

// Consultar por ID
productoCtrl.getProductoById = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProducto.findById({ _id: id });
    res.send(respuesta);
};

// Actualizar usuario por ID
productoCtrl.updateProducto = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelProducto.findByIdAndUpdate({ _id: id }, body);
    res.send(respuesta);
};

// Eliminar usuario por ID
productoCtrl.deleteProducto = async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProducto.deleteOne({ _id: id });
    res.send(respuesta);
};

module.exports = productoCtrl;