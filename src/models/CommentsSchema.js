const { Schema, model } = require("mongoose");

// Subject -> questions -> | comments

const CommentsSchema = new Schema({
    // _id
    message: { type: String, required: true },
    questionId: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = model("CommentsSchema", CommentsSchema);