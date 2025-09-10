// Importar dependencias
const express = require("express"); // Importan paquetes/archivos necesarios.
const cors = require('cors');
// const bcrypt = require("bcrypt"); // Importa `bcrypt`, librería para encriptar y comparar contraseñas de forma segura.
const dbconnect = require("./config"); // Importa la función dbconnect que está en config.js — sirve para conectar a MongoDB.

const app = express(); // Crea la instancia principal de la aplicación Express.
// const router = express.Router(); // Crea un "router" que agrupa rutas; es útil para organizar endpoints antes de montarlos en `app`.

// Middleware para interpretar JSON en requests
app.use(express.json()); // Middleware que permite leer `req.body` cuando el cliente envía JSON (Postman, fetch, etc.).


app.use(cors({origin: '*'}));
app.use('/api/usuarios', require('./routes/usuario_routes'));
app.use('/api/productos', require('./routes/producto_routes'));

/**
 * ========================
 *   Configuración Servidor
 * ========================
 */
// app.use(router);

app.listen(3005, () => {
    console.log("✅ El servidor está en el puerto 3005");
});

// Conexión a la base de datos
dbconnect();
