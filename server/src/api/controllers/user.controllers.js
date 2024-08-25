const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../utils/jwt")
const { deleteFile } = require("../../utils/deleteFileCloudinary")

/* const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const createdUser = await newUser.save()

        return res.status(200).json({ message: "Usuario creado", data: createdUser })


    } catch (error) {
        console.log(error)
    }

} */
const addUser = async (req, res) => {
    /*  try { */
    const newUser = new User(req.body);
    const findUser = await User.find({ email: newUser.email });
    if (findUser.length === 0) {
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const createdUser = await newUser.save();
        return res.status(200).json({ message: "Usuario creado", data: createdUser })
    } else {
        return res.status(200).json({
            message: "Este email ya existe"
        })
    }
}



const addRecipeToUser = async (req, res) => {

    const { idR, idU } = req.params;
    console.log(idR, idU)

    const modifyUser = await User.findByIdAndUpdate(
        idU,
        { $push: { recipe: idR } },
        { new: true })
    if (!modifyUser) {
        return res.json({ message: "Usuario no encontrado" })
    } else {
        return res.json({ message: "Usuario modificado con éxito", data: modifyUser })

    }

}
const getUserById = async (req, res) => {
    const { id } = req.query;
    const users = await User.findById(id).populate("recipe")
    if (!user) {
        return res.json({ messagge: "usuario no existe" })
    } else {
        return res.json({ data: users })
    }
}

const deleteRecipeUser = async (req, res) => {
    const { idR, idU } = req.query;

    //encontrar el usuario y modificarlo
    //$pull --> elimina del array
    const updateUser = await User.findByIdAndUpdate(
        idU,
        { $pull: { recipe: idR } },
        { new: true }
    )

    return res.json({ data: updatedUser })
    //buscar al usuario, sacar el elemento del aray (filter, splice, slice), guardar los datos del usuario save()
}

//

const getProfile = (req, res) => {
    console.log(req.dataUser)
    return res.json({
        name: req.dataUser.name,
        role: req.dataUser.role
    })
}

//autenticacion
const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await User.find({ email: user.email })
        if (userByEmail !== 0) {
            if (bcrypt.compareSync(user.password, userByEmail[0].password)) {
                // crear el token y retornarlo
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email }
                const token = generateToken(data)
                return res.status(200).json({ message: token })
            } else {
                return res.status(200).json({ message: "la contraseña no coincide" })
            }
        }
        else {
            return res.status(200).json({ message: "el email no existe" })
        }
    }
    catch (error) {
    }
}


const deleteUser = async (req, res) => {
    // id del usuario que quiero eliminar por query
    const { id } = req.query;
    // findByIdAndDelete
    const deleted = await User.findByIdAndDelete(id)
    //borra su foto en cloudinary
    if (!deleted) {
        return res.json({ message: "el id no existe" })
    }

    //response --> devolver el usuario eliminado
    /* return res.json({ deleted }) */

    //borrado de cloudinary
    if (deleted.image) {
        deleteFile(deleted.image)
    }


    return res.json({ deleted })
}




module.exports = { addUser, addRecipeToUser, getUserById, deleteRecipeUser, login, getProfile, deleteUser }