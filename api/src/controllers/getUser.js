require('dotenv').config();
const { Sequelize } = require('sequelize');
const { User } = require("../db")


const getUser = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).end(error.message)
    }
}

module.exports = { getUser }
