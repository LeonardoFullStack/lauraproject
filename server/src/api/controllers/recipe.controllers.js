const Recipe = require("../models/recipe.model")

const getrecipe = async (req, res) => {

    //aqui se usara el modelo de datos
    try {
        const listRecipes = await Recipe.find();
        res.json(listRecipes)
    } catch (error) {
        console.log(error);


    }
}
//buscar una receta por nombre, se debe enviar en la url de la peticion /getRecipe/:name
const getRecipeName = async (req, res) => {
    const { name } = req.params;
    const recipeByName = await Recipe.find({ name: name })
    res.json(recipeByName)
}
// añadir una nueva receta
const add = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const findRecipe = await Recipe.find({ name: newRecipe.name })

        if (findRecipe.length === 0) {
            if (req.file.path) {
                newRecipe.image = req.file.path;
            }
            //si la receta no está en la BD
            /* const recipe = new Recipe(newRecipe) */
            const createdRecipe = await newRecipe.save();
            return res.status(200).json({ message: "Receta creada", data: createdRecipe })
        } else {
            return res.status(200).json({ message: "La receta está repetida" })
        }
    } catch (error) {

    }
}
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRe = await Recipe.findByIdAndDelete(id);
        if (deleteRe) {
            res.status(201).json({ success: true, message: deleteRe })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }

    } catch (error) {
        res.status(500).json(error)
    }



}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.query;
        const recipeBody = req.body;
        const updateRecipe = await Recipe.findByIdAndUpdate(id, recipeBody, { new: true })
        if (!updateRecipe) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updateRecipe)
        }

    } catch (error) {
        res.status(200).json(error)
    }


}
module.exports = { getrecipe, getRecipeName, add, deleteRecipe, updateRecipe }