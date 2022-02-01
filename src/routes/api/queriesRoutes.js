import express from 'express'
import QueryController from '../../controllers/queriesController.js'
import QueryValidation from '../../validations/queryValidation/queryValidation.js'
import { authenticateApi } from '../../middlewares/authentication.js'
const route = express.Router()

route.get('/', authenticateApi, QueryController.getAllQueries)

route.post('/', QueryValidation.createQuery, QueryController.creatingQuery)

route.delete("/delete/:id", authenticateApi, QueryController.deleteQueries)

route.get("/getOne/:id", authenticateApi, QueryController.getOneQuery)

export default route

