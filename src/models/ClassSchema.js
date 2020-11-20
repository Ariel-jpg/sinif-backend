const { Schema, model } = require("mongoose");

// | Class -> questions -> comments

const ClassSchema = new Schema({
    _id: String,
    className: { type: String, required: true }
});

module.exports = model("ClassSchema", ClassSchema);