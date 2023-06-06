const { Users } = require("../models");
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')


const createUser = async (req, res) => {
    const { username, password } = req.body;


    // check if user already exists
    const user = await Users.findOne({ where: { username } });
    if (user) {
        return res.status(200).json({
            status: 'ERR',
            message: 'User already exists'
        });
    }

    // create new user
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json({
            status: 'SUCCESS',
            message: 'REGISTER SUCESSFULY'
        });

    });
}

const loginInfo = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
        return;
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });

        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
        );
        res.json({ token: accessToken, username: username, id: user.id });
    });
}

const authUser = async (req, res) => {
    res.json(req.user)
}

const basicInfo = async (req, res) => {
    const id = req.params.id

    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ['password'] }
    })

    res.json(basicInfo)
}


module.exports = {
    createUser,
    loginInfo,
    authUser,
    basicInfo
}