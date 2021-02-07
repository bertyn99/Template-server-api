// To declare
//db and schema
/* const User = require("../db/type/user"); */
const User = require("../db/schema/user");
const database = require("../db/connexion");

const bcrypt = require("bcrypt");

async function register(req, res) {

    const user = new User(req.body)

    try {
        await user.save()
        //envoyer l'emaild e confirmation de création de compte
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logIn(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logOut(req, res) {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

}

async function infoUser(req, res) {
    const _id = req.params.id

    try {

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(404).send(e)
    }
}







// Function
/* async function registerUser(req, res) {
    if (!req.body.mail || !req.body.firstname || !req.body.lastname || !req.body.address || !req.body.city || !req.body.zip || !req.body.mobile || !req.body.password) {
        return res.status(400).json({
            status: "Veuillez remplir completement le formulaire d'inscription",
        });
    }
 
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    //const ip = req.headers["x-forwarded-for"].split(',')[0] || req.connection.remoteAddress;
 
    if (await isUserExist.byMail(req.body.mail)) {
        return res.status(400).json({
            status: "Votre adresse mail est déjà utiliser",
        });
    }
 
    newUser = new UserShema(new User(req.body.mail, req.body.firstname, req.body.lastname, req.body.address, req.body.city, req.body.zip, password, req.body.mobile, ip));
 
    newUser.save((err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            return updateUser(data._id, randKey.generate(250), res);
        }
    });
} */

module.exports = {
    register,
    logIn,
    logOut
}