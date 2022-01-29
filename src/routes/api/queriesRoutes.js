import express from 'express'
const QueryController = require("../../controllers/queriesController.js")

const route = express.Router()

route.get('/get', (req, res, next) => {
    res.status(200).json({ status: 200, message: "this will return all queries", data: "" })
})

route.post('/', async (req, res, next) => {
    await QueryController.creatingQuery(req, res)
})
export default route

