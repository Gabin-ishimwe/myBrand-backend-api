import express from 'express'
import QueryController from '../../controllers/queriesController.js'

const route = express.Router()

route.get('/', QueryController.getAllQueries)

route.post('/', QueryController.creatingQuery)

route.delete("/delete/:id", QueryController.deleteQueries)

route.get("/getOne/:id", QueryController.getOneQuery)

export default route

