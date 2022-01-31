import express from 'express'
import QueryController from '../../controllers/queriesController.js'

const route = express.Router()

route.get('/getAll', async (req, res, next) => {
    await QueryController.getAllQueries(req, res)
})

route.post('/createQuerie', async (req, res, next) => {
    await QueryController.creatingQuery(req, res)
})

route.delete("/delete/:id", async (req, res) => {
    await QueryController.deleteQueries(req, res)
})

route.get("/getOne/:id", async (req, res) => {
    await QueryController.getOneQuery(req, res)
})

export default route

