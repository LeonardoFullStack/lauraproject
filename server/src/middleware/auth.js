const { verifyToken } = require("../utils/jwt")
const User = require("../api/models/user.model.js")

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization
    // Bearer y el token
    if (!authorization) {
        return res.json({ message: "No está autorizado" })
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "No hay token" });
    }
    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ message: "No existe el id del usuario que estás mandando" });
    }
    const logged = await User.findById(tokenVerify.id);
    req.dataUser = logged;
    next()
}

/* req.dataUser.admin = adminLogged */
/* User.findByIdAndDelete */

const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization
    // Bearer y el token

    if (!authorization) {

        return res.json({ message: "No está autorizado" })
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No hay token" });
    }

    const tokenVerify = verifyToken(token);

    if (!tokenVerify.id) {
        return res.json({ message: "No existe el id del usuario que estás mandando" });
    }

    const logged = await User.findById(tokenVerify.id);


    if (logged.role !== "admin") {
        return res.json({ message: "Tu rol no es admin y no tienes permisos" })
    }
    req.dataUser = logged;
    next()
}


module.exports = { isAuth, isAdmin }