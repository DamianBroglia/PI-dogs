require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require('sequelize');
const { Dog, Temperament } = require("../db")

const getBreedById = async (req, res) => {
    const { idRaza } = req.params
    try {
        const dogId = await Dog.findByPk(idRaza, {
            include: Temperament
        })
        if (dogId) {
            res.status(200).end(JSON.stringify(dogId))
        } else {
            let result = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            const dogBreed = result.data.filter(breed => breed.id === Number(idRaza))
            if (dogBreed.length > 0) {
                const dog = {
                    id: dogBreed[0].id,
                    image: dogBreed[0].image.url,
                    name: dogBreed[0].name,
                    height: dogBreed[0].height.metric,
                    weight: dogBreed[0].weight.metric,
                    lifeSpan: dogBreed[0].life_span,
                    origin: dogBreed[0].origin,
                    breedGroup: dogBreed[0].breed_group,
                    temperament: dogBreed[0].temperament
                }
                res.status(200).end(JSON.stringify(dog))
            } else {
                res.status(404).end("Raza no hallada")
            }
        }
    } catch (error) {
        res.status(500).end(error.message)
    }
}

module.exports = { getBreedById }