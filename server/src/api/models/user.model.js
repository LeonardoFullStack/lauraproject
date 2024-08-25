const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "client"], default: "client" },
    //date: { type: Date, default: Date.now()},
    recipe: [{ type: Schema.Types.ObjectId, ref: "recipe" }],

}, {
    collection: "user",
    timestamps: true
}
)
const User = mongoose.model("user", userSchema)
module.exports = User;