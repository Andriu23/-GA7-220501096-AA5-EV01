// Importar dependencias
const express = require("express");
const bcrypt = require("bcrypt");
const dbconnect = require("./config");
const ModelUser = require("./model");

const app = express();
const router = express.Router();

// Middleware para interpretar JSON en requests
app.use(express.json());

/**
 * ========================
 *   Rutas de Autenticación
 * ========================
 */

/**
 * Registro de usuario
 * POST /registro
 */
router.post('/registro', async (req, res) => {
    try {
        const { nomuser, password } = req.body;

        // Validar si ya existe el usuario
        const existe = await ModelUser.findOne({ nomuser });
        if (existe) {
            return res.status(400).send({ error: "El usuario ya existe" });
        }

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Guardar en BD
        const nuevoUsuario = await ModelUser.create({ nomuser, password: passwordHash });

        res.status(201).send({ mensaje: "Usuario registrado correctamente", usuario: nuevoUsuario.nomuser });
    } catch (err) {
        res.status(500).send({ error: "Error en el registro", detalle: err.message });
    }
});

/**
 * Login de usuario
 * POST /login
 */
router.post('/login', async (req, res) => {
    try {
        const { nomuser, password } = req.body;

        // Buscar usuario en la BD
        const usuario = await ModelUser.findOne({ nomuser });
        if (!usuario) {
            return res.status(401).send({ error: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            return res.status(401).send({ error: "Contraseña incorrecta" });
        }

        res.send({ mensaje: "Autenticación satisfactoria" });
    } catch (err) {
        res.status(500).send({ error: "Error en el login", detalle: err.message });
    }
});

/**
 * ========================
 *   Rutas CRUD Usuarios
 * ========================
 */

// Crear usuario (sin encriptar, para pruebas generales del CRUD)
router.post('/', async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUser.create(body);
    res.send(respuesta);
});

// Consultar todos los usuarios
router.get('/', async (req, res) => {
    const respuesta = await ModelUser.find({});
    res.send(respuesta);
});

// Consultar por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.findById({ _id: id });
    res.send(respuesta);
});

// Actualizar usuario por ID
router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findByIdAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({ _id: id });
    res.send(respuesta);
});

/**
 * ========================
 *   Configuración Servidor
 * ========================
 */
app.use(router);

app.listen(3005, () => {
    console.log("✅ El servidor está en el puerto 3005");
});

// Conexión a la base de datos
dbconnect();
