const jwt = require("jsonwebtoken");

const generateToken = (data) => {
    //data --> {id, email}
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "5h" })
}
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { generateToken, verifyToken }