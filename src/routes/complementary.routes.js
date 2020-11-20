const ClassSchema = require("../models/ClassSchema");
const UserSchema = require("../models/UserSchema");
const router = require("express").Router();

// GENERATE CODES OF A CLASS AND OTHER FUNCTIONALITIES

router.post("/createclass", async (req, res) => {
    const { className } = req.body;
    const _id = Date.now().toString(36);

    await new ClassSchema({ _id, className }).save()
        .then(_ => res.status(200).json({ status: 200, body: { _id } }))
        .catch(err => { res.status(500).json({ err }); })
});

module.exports = router;