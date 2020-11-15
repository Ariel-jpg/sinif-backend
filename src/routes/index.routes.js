const app = require("express")();

app.use("/api/session", require("./session.routes"));
app.use("/api/classMessages", require("./classMessages.routes"));
app.use("/api/commentMessages", require("./commenMessages.routes"));
app.use("/api/user", require("./user.routes"));
app.use("/api/", require("./complementary.routes"));

module.exports = app;