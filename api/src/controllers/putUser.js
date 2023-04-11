require('dotenv').config();
const { Sequelize } = require('sequelize');
const { User } = require("../db")

const putUser = async (req, res) => {
    const { userId, favId, addOrDel } = req.params
    try {
        if (addOrDel === "add") {
            const user = await User.findByPk(userId)
            user.favorites = [...user.favorites, favId]
            await user.save()
            res.status(200).json(user)
        }
        if (addOrDel === "del") {
            const user = await User.findByPk(userId)
            user.favorites = user.favorites.filter(e => e !== favId)
            await user.save()
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).end(error.message)
    }
}

module.exports = { putUser }