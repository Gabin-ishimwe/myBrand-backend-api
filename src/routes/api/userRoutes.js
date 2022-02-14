import userController from '../../controllers/userController'
import UserValidation from '../../validations/userValidation/userValidation'
import express from 'express'
import { authenticateApi } from '../../middlewares/authentication'

const route = express.Router()

route.post('/register', UserValidation.userSignIn, userController.userSignUp)
route.post('/login', UserValidation.userLogin, userController.userLogin)

export default route