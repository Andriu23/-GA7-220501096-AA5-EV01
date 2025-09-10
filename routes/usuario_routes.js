const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario_controller');

router.get('/', usuarioCtrl.getUser);
router.post('/', usuarioCtrl.createUser);
router.get('/:id', usuarioCtrl.getUserById);
router.put('/:id', usuarioCtrl.updateUser);
router.delete('/:id', usuarioCtrl.deleteUser);

module.exports = router;