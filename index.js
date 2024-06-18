const express = require("express");
const cors = require("cors");
const path = require("path");
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
app.use("*", ( req, res ) => {
  res.sendFile( path.join( __dirname, "public/index.html" ))  
})

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})