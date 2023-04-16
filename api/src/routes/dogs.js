const express = require("express");
const router = express.Router();
const { getBreed } = require("../controllers/getBreed.js")
const { getBreedById } = require("../controllers/getBreedById.js")
const { getBreedByName } = require("../controllers/getBreedByName.js")
const { getTemperament } = require("../controllers/getTemperament.js")
const { getUser } = require("../controllers/getUser.js")
const { postDog } = require("../controllers/postDog.js")
const { postUser } = require("../controllers/postUser.js")
const { putUser } = require("../controllers/putUser.js")


router.get("/dogs/name", getBreedByName)
router.get("/dogs", getBreed)
router.get("/dogs/:idRaza", getBreedById)
router.post("/dog", postDog)
router.get("/temperament", getTemperament)
router.get("/user", getUser)
router.post("/user", postUser)
router.put("/user/:userId/:favId/:addOrDel", putUser)

module.exports = router;