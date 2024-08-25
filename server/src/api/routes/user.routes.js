const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middleware/auth")
const { addUser, addRecipeToUser, getUserById, deleteRecipeUser } = require("../controllers/user.controllers")
const { login, getProfile, deleteUser } = require("../controllers/user.controllers");

router.post("/add", addUser);
router.post("/login", login);
//ver perfil de usuario - rutas privadas

router.put("/addRecipe/:idR/:idU", addRecipeToUser);
router.get("/getById", getUserById);


router.delete("/deleteuser", [isAdmin], deleteUser);

router.put("/deleteRecipe", deleteRecipeUser);

router.get("/profile", [isAuth], getProfile);

/* const upload = require("../../middleware/upload");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken") */



module.exports = router 