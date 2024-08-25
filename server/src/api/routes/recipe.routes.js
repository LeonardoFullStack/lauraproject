const express = require("express");
const router = express.Router();
const { getrecipe, getRecipeName, add, deleteRecipe, updateRecipe } = require("../controllers/recipe.controllers")
const upload = require("../../middleware/upload")

router.get("/getrecipe", getrecipe);
router.get("/getByName/:name", getRecipeName);
router.post("/addRecipe", upload.single("image"), add);
router.delete("/delete/:id", deleteRecipe);
// el id lo vamos a enviar a través de los query
router.put("/updateRecipe", updateRecipe);


module.exports = router 