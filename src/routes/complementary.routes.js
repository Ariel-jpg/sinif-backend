const SubjectSchema = require("../models/SubjectSchema");
const UserSchema = require("../models/UserSchema");
const router = require("express").Router();

// GENERATE CODES OF A CLASS AND OTHER FUNCTIONALITIES

router.post("/createclass", async (req, res) => {
    const { className } = req.body;

    await new SubjectSchema({ className }).save()
        .then(_ => res.status(200).json({ body: "Clase creada con éxito." }))
        .catch(err => { console.log(err); res.status(500); })
});

module.exports = router;