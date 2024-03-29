
const ClassSchema = require("../models/ClassSchema");
const UserSchema = require("../models/UserSchema");
const router = require("express").Router();

router.patch("/", async (req, res) => {
    const { _id } = req.body;

    UserSchema.updateOne({ _id }, req.body).exec()
        .then(res => console.log(res))
        .catch(err => console.log(err))
});

router.post("/getlessons", async (req, res) => {
    const { _id } = req.body; // _id of one user
    console.log(req.body);

    await UserSchema.findOne({ _id }, { lessonsId: 1, _id: 0 }).lean().exec()
        .then(({ lessonsId }) => ClassSchema.find({ _id: lessonsId }).lean().exec()
            .then(userLessons => res.status(200).json({ status: 200, body: userLessons }))
        )
        .catch(err => { res.status(500); console.log(err) })
});

router.patch("/student/joinClass", async (req, res) => {
    const { classCode, userId } = req.body;

    ClassSchema.findOne({ _id: classCode }).lean().exec()
        .then(_ => {
            UserSchema.updateOne({ _id: userId }, { $push: { lessonsId: classCode } }).exec()
                .then(_ => res.status(200).json({ status: 200, body: { message: "Good" } }))
                .catch(_ => res.status(500).send({}))
        })
        .catch(err => res.status(400).json({ errorMessage: "La clase ingresada no existe." }))
});

module.exports = router;