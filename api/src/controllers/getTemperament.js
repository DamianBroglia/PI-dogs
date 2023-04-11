require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require('sequelize');
const { Temperament } = require("../db")

const getTemperament = async (req, res) => {
    try {
        const temper = await Temperament.findAll()
        if (temper.length > 0) {
            return res.status(200).json(temper)
        } else {
            const dataApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            const breedApi = dataApi.data
            for (let i = 0; i < breedApi.length; i++) {
                let tempe = breedApi[i].temperament
                if (tempe) {
                    arrayTempe = tempe.split(",")
                    for (let j = 0; j < arrayTempe.length; j++) {
                        const obj = {
                            name: arrayTempe[j]
                        }
                        await Temperament.findOrCreate({ where: { name: obj.name } })
                    }
                }
            }
            const temperDB = await Temperament.findAll()
            res.status(200).json(temperDB)
        }
    } catch (error) {
        res.status(400).end(error.message)
    }
}

module.exports = { getTemperament }