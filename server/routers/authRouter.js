const express = require('express')
const { loginOwnerController } = require('../controllers/loginOwnerController')
const authenticateToken = require('../middlewares/authenticateToken')


const authRouter = express.Router();

authRouter.post('/Owners/login', loginOwnerController)


module.exports = authRouter;