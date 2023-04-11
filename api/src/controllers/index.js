// require('dotenv').config();
// const { API_KEY } = process.env;
// const axios = require("axios");
// const { Sequelize } = require('sequelize');
// const { Dog, Skill, User, Temperament } = require("../db")


// const getBreed = async (req, res) => {
//     try {
//         let arrayResult = []
//         const dbDogs = await Dog.findAll()
//         const dogB = dbDogs.map(breed => {
//             return {
//                 id: breed.dataValues.id,
//                 image: breed.dataValues.image,
//                 name: breed.dataValues.name,
//                 height: breed.dataValues.height,
//                 weight: breed.dataValues.weight,
//                 lifeSpan: breed.dataValues.lifeSpan,
//                 origin: breed.dataValues.origin,
//                 breedGroup: breed.dataValues.breedGroup,
//                 temperament: breed.dataValues.temperament
//             }
//         })
//         let result = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//         const dogBreed = result.data.map(breed => {
//             return {
//                 id: breed.id,
//                 image: breed.image.url,
//                 name: breed.name,
//                 height: breed.height.metric,
//                 weight: breed.weight.metric,
//                 lifeSpan: breed.life_span,
//                 origin: breed.origin,
//                 breedGroup: breed.breed_group,
//                 temperament: breed.temperament
//             }
//         })
//         arrayResult = [...dogBreed, ...dogB]
//         res.status(200).end(JSON.stringify(arrayResult))
//     } catch (error) {
//         res.status(500).end(error.message)
//     }
// }

// const getBreedById = async (req, res) => {
//     const { idRaza } = req.params
//     try {
//         const dogId = await Dog.findByPk(idRaza)
//         if (dogId) {
//             res.status(200).end(JSON.stringify(dogId))
//         } else {
//             let result = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//             const dogBreed = result.data.filter(breed => breed.id === Number(idRaza))
//             if (dogBreed.length > 0) {
//                 const dog = {
//                     id: dogBreed[0].id,
//                     image: dogBreed[0].image.url,
//                     name: dogBreed[0].name,
//                     height: dogBreed[0].height.metric,
//                     weight: dogBreed[0].weight.metric,
//                     lifeSpan: dogBreed[0].life_span,
//                     origin: dogBreed[0].origin,
//                     breedGroup: dogBreed[0].breed_group,
//                     temperament: dogBreed[0].temperament
//                 }
//                 res.status(200).end(JSON.stringify(dog))
//             } else {
//                 res.status(404).end("Raza no hallada")
//             }
//         }
//     } catch (error) {
//         res.status(500).end(error.message)
//     }
// }

// const getBreedByName = async (req, res) => {
//     const { name } = req.query
//     try {
//         if(name.length > 0){
//             const breedDB = await Dog.findAll({ where: { name: name } })
//             if (breedDB.length > 0) {
//                 res.status(200).json({id: breedDB[0].id})
//             } else {
//                 let result = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
//                 if (result.data.length > 0) {      
//                 const dogBreed = result.data
//                     res.status(200).json({id: dogBreed[0].id})
//                 } else {
//                     res.status(404).end("No existe raza con dicho nombre")
//                 }
//             }
//         }else{
//             res.status(400).end("Debes escribir el nombre de la raza")
//         }
//     } catch (error) {
//         res.status(500).end(error.message)
//     }
// }

// const postDog = async (req, res) => {
//     const { userId, image, name, height, weight, lifeSpan, origin, breedGroup, temperament } = req.body
//     try {
//         const dbDogs = await Dog.findAll()
//         let dogBreed = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//         const validateDB = dbDogs.map(breed => breed.dataValues)
//         let allBreed = [...dogBreed.data, ...validateDB]
//         const exists = allBreed.find(e => e.name === name)
//         if (exists) {
//             throw new Error(`La raza ${exists.name}`)
//         } else {
//             let id = Number(allBreed[allBreed.length - 1].id) + 1
//             const user = await User.findByPk(userId)
//             user.created = [...user.created, id]
//             await user.save()
//             obj = { id, image, name, height, weight, lifeSpan, origin, breedGroup, temperament }
//             await Dog.create(obj)
//             res.status(200).json(obj)
//         }
//     } catch (error) {
//         res.status(400).end(error.message)
//     }
// }

// const getTemperament = async (req, res) => {
//     try {
//         const temper = await Temperament.findAll()
//         if (temper.length > 0) {
//             return res.status(200).json(temper)
//         } else {
//             const dataApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//             const breedApi = dataApi.data
//             for (let i = 0; i < breedApi.length; i++) {
//                 let tempe = breedApi[i].temperament
//                 if (tempe) {
//                     arrayTempe = tempe.split(",")
//                     for (let j = 0; j < arrayTempe.length; j++) {
//                         const obj = {
//                             name: arrayTempe[j]
//                         }
//                         await Temperament.findOrCreate({ where: { name: obj.name } })
//                     }
//                 }
//             }
//             const temperDB = await Temperament.findAll()
//             res.status(200).json(temperDB)
//         }
//     } catch (error) {
//         res.status(400).end(error.message)
//     }
// }

// const postSkills = async (req, res) => {
//     const { force, agility, loyalty, affectivity, rage } = req.body
//     const { idRaza, idUser } = req.params
//     try {
//         let id = Number(`${idUser}${idRaza}`)
//         obj = { id, breedId: idRaza, force, agility, loyalty, affectivity, rage, userId: idUser }
//         await Skill.create(obj)
//         res.status(200).json(obj)
//     } catch (error) {
//         res.status(400).end(error.message)
//     }
// }

// const getSkills = async (req, res) => {
//     const { idRaza } = req.params
//     try {
//         const skill = await Skill.findAll({ where: { breedId: idRaza } })
//         if (skill.length > 0) {
//             res.status(200).json(skill)
//         } else {
//             throw new Error("Esta raza no tiene skills definidas")
//         }
//     } catch (error) {
//         res.status(400).end(error.message)
//     }
// }

// const postUser = async (req, res) => {
//     const { username, email, password, favorites, created } = req.body
//     try {    
//         obj = { username, email, password, favorites, created }
//         await User.create(obj)
//         res.status(200).json(obj)
//     } catch (error) {
//         res.status(400).end(error.message)
//     }
// }

// const getUser = async (req, res) => {
//     try {
//         const users = await User.findAll()
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).end(error.message)
//     }
// }


// const putUser = async (req, res) => {
//     const { userId, favId, addOrDel } = req.params
//     try {
//         if (addOrDel === "add") {
//             const user = await User.findByPk(userId)
//             user.favorites = [...user.favorites, favId]
//             await user.save()
//             res.status(200).json(user)
//         }
//         if (addOrDel === "del") {
//             const user = await User.findByPk(userId)
//             user.favorites = user.favorites.filter(e => e !== favId)
//             await user.save()
//             res.status(200).json(user)
//         }

//     } catch (error) {
//         res.status(500).end(error.message)
//     }
// }



// module.exports = {
//     getBreed,
//     getBreedById,
//     getBreedByName,
//     postDog,
//     getTemperament,
//     postSkills,
//     getSkills,
//     postUser,
//     getUser,
//     putUser
// }