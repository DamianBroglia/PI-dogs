require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require('sequelize');
const { Dog  } = require("../db")


const getBreed = async (req, res) => {
    try {
        let arrayResult = []
        const dbDogs = await Dog.findAll()
        const dogB = dbDogs.map(breed => {
            return {
                id: breed.dataValues.id,
                image: breed.dataValues.image,
                name: breed.dataValues.name,
                height: breed.dataValues.height,
                weight: breed.dataValues.weight,
                lifeSpan: breed.dataValues.lifeSpan,
                origin: breed.dataValues.origin,
                breedGroup: breed.dataValues.breedGroup,
                temperament: breed.dataValues.temperament
            }
        })
        let result = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dogBreed = result.data.map(breed => {
            return {
                id: breed.id,
                image: breed.image.url,
                name: breed.name,
                height: breed.height.metric,
                weight: breed.weight.metric,
                lifeSpan: breed.life_span,
                origin: breed.origin,
                breedGroup: breed.breed_group,
                temperament: breed.temperament
            }
        })
        arrayResult = [...dogBreed, ...dogB]
        res.status(200).end(JSON.stringify(arrayResult))
    } catch (error) {
        res.status(500).end(error.message)
    }
}

module.exports = { getBreed }