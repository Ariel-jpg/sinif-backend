const router = require("express").Router();

const UserSchema = require("../models/UserSchema")

router.post("/login", async (req, res) => {
    const { _id, password } = req.body;

    console.log(req.body);

    await UserSchema.findOne({ _id, password }).exec()
        .then(user => {
            !user && res.status(400).json({ status: 400, errorMessage: "Los datos ingresados no corresponden a un usuario." })
            res.status(200).json({ status: 200, body: { _id } })
        })
        .catch(err => res.status(500))
});

router.post("/registry", async (req, res) => {
    const { _id, username, password, role } = req.body,
        newUser = { _id, username, password, role };

    // Check lessonsId
    console.log(newUser);

    await new UserSchema(newUser).save()
        .then(_ => res.status(200).json({ status: 200, body: { _id, password } }))
        .catch(err => {
            err.code === 11000 ? res.status(400).json({
                status: 400,
                errorMessage: "El dni ingresado ya está registrado en nuestros servidores."
            })
                : res.status(500);
        })
});

module.exports = router;