const { Schema, model } = require("mongoose");

// | Subject -> questions -> comments

const SubjectSchema = new Schema({
    // _id - classCode
    className: { type: String, required: true }
});

module.exports = model("SubjectSchema", SubjectSchema);