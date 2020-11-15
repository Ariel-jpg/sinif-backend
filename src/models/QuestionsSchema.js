const { Schema, model } = require("mongoose");

// Subject -> | questions -> comments

const QuestionsSchema = new Schema({
    // _id
    title: { type: String, required: true },
    classCode: { type: String, required: true },
    date: { type: String, required: true },
    description: String,
});

module.exports = model("QuestionsSchema", QuestionsSchema);