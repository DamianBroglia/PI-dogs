require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require('sequelize');
const { Dog } = require("../db")

const getBreedByName = async (req, res) => {
    const { name } = req.query
    try {
        if (name.length > 0) {
            const breedDB = await Dog.findAll({ where: { name: name } })
            if (breedDB.length > 0) {
                res.status(200).json({ id: breedDB[0].id })
            } else {
                let result = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
                if (result.data.length > 0) {
                    const dogBreed = result.data
                    res.status(200).json({ id: dogBreed[0].id })
                } else {
                    const obj = {
                        key: 0,
                        id: 0,
                        image: "https://c8.alamy.com/compes/2ce2cr8/signo-de-interrogacion-perro-2ce2cr8.jpg",
                        name: "No hay raza con este nombre",
                        height: "???",
                        weight: "???",
                        lifeSpan: "???",
                        origin: "???",
                        breedGroup: "???"
                    }
                    res.status(404).json(obj)
                }
            }
        } else {
            res.status(400).end("Debes escribir el nombre de la raza")
        }
    } catch (error) {
        
        res.status(500).end(error.message)
    }
}

module.exports = { getBreedByName }