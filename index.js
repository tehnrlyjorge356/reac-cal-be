const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config")

// Crear servidor express
const app = express();

// Base de datos
dbConnection();

// cors
app.use(cors())

// Dir publico
    // use middleware
app.use( express.static("public") );

// lectura y parseo del body
app.use( express.json() )

//rutas
// TODO: auth, crear, login, renew, tokens
// TODO: CRUD eventos
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})