const express = require("express");

const multer = require("multer");
const path = require("path");
const cors = require("cors");
const server = express();

const { connectDB } = require("./src/utils/db")
const router = require("./src/api/routes/recipe.routes")
const routerUsers = require("./src/api/routes/user.routes")
const env = require("dotenv")
env.config()
const cloudinary = require("cloudinary").v2

//
server.use(cors());
// Configurar multer para almacenar archivos en una carpeta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });
server.use(express.json());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint para subir imágenes
server.post("/upload", upload.single("image"), (req, res) => {
    try {
        res.status(200).json({
            message: "Imagen subida con éxito",
            filePath: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al subir la imagen", error });
    }
});
//

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


connectDB();


const PORT = process.env.PORT;

server.use(express.json())
server.use("/", router)
server.use("/user", routerUsers)


server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT}`)
})

// todo esto es una API
// modelo --> estructura de BD (colecciones),
// vistas --> routes
// controladores --> funcionalidad para acceder a la BD
// utils --> funciones de validacion, conexion de BD, middleware