const { Router } = require('express');
const app = require("./dogs")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use(app)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
