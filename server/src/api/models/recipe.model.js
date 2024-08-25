const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

    name: { type: String, require: true },
    /* time: { type: Number }, */
    categoria: {
        type: String, enum: [
            "Recetas Keto",
            "Recetas Vegetarianas",
            "Recetas Veganas",
            "Recetas Sin Gluten",
            "Recetas de Bajo Contenido Calórico",
            "Recetas de Cocina Rápida",
            "Recetas Tradicionales",
            "Recetas para Niños",
        ],
    },
    image: { type: String, default: "" },
    ingredient: { type: String },
    instruction: { type: String },
}, {
    collection: "recipe"
}
)
//string, number, array, date, boolean, ObjectId
const Recipe = mongoose.model("recipe", recipeSchema)
module.exports = Recipe;

//name de receta
/* 
time=price de preparación
Ingredientes
Instruccion
Foto */