const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/messageDbTest", { useNewUrlParser: true,  useUnifiedTopology: true },
    () => console.log("Database connect"));

module.exports = mongoose;