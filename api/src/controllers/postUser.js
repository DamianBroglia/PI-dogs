require('dotenv').config();
const { Sequelize } = require('sequelize');
const { User, } = require("../db")

const postUser = async (req, res) => {
    const { username, email, password, favorites, created } = req.body
    try {
        obj = { username, email, password, favorites, created }
        await User.create(obj)
        res.status(200).json(obj)
    } catch (error) {
        res.status(400).end(error.message)
    }
}

module.exports = { postUser }