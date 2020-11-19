const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    _id: { type: Number }, // It is the DNI
    username: { type: String, required: true },
    subjectsId: { type: Array, required: true },
    password: { type: String, required: true },
    role: { type: Boolean, required: true } // False = alumno, True = profesor
});

module.exports = model("UserSchema", UserSchema);