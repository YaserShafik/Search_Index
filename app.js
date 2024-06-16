const express = require("express");
const {Client} = require("@elastic/elasticsearch");
const  connectDB = require("./config/db")
const searchRoutes = require("./routes/search")
const populateDB = require("./scripts/populateDB")
var app = express();

connectDB();

app.use(express.json());
app.use('/api/search', searchRoutes);
app.use(express.static('public'));

async function initializeDB() {
    try {
        await populateDB(); // Llamar a la función que inserta datos en la base de datos
        console.log("Datos insertados correctamente en la base de datos.");
    } catch (error) {
        console.error("Error al insertar datos en la base de datos:", error);
    } finally {
        // Cerrar la conexión a la base de datos si es necesario
        // mongoose.connection.close();
    }
}

// Llamar a la función para inicializar la base de datos
initializeDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server escuchando');
})