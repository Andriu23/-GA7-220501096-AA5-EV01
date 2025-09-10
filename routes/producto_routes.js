const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/producto_controller');

router.get('/', productoCtrl.getProducto);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getProductoById);
router.put('/:id', productoCtrl.updateProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;