require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require('sequelize');
const { Dog, User, Temperament } = require("../db")

const postDog = async (req, res) => {
    const { userId, image, name, height, weight, lifeSpan, origin, breedGroup, temperament } = req.body
    try {
        const dbDogs = await Dog.findAll()
        let dogBreed = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const validateDB = dbDogs.map(breed => breed.dataValues)
        let allBreed = [...dogBreed.data, ...validateDB]
        const exists = allBreed.find(e => e.name === name)
        if (exists) {
            res.status(404).end(`La raza ${exists.name} ya existe`)
        } else {
            let id = Number(allBreed[allBreed.length - 1].id) + 1
            // const user = await User.findByPk(userId)
            // user.created = [...user.created, id]
            // await user.save()
            obj = {userId, id, image, name, height, weight, lifeSpan, origin, breedGroup }
            const newDog = await Dog.create(obj)
            await newDog.addTemperaments(temperament)
            res.status(200).json(obj)
        }
    } catch (error) {
        res.status(400).end(error.message)
    }
}

module.exports = { postDog }