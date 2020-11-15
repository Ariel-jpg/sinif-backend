const router = require("express").Router();

router.post("/", async (req, res) => {
    console.log("REQ:", req.body)

    const { subjectId } = req.body;

    // Con el subjectId devolvemos los mensajes que concuerden con él.

    await QuestionsSchema.find({ subjectId }).lean().exec()
        .then(data => res.json(data))
        .catch(err => console.log("Error subjectMessages:", err))
})

module.exports = router;