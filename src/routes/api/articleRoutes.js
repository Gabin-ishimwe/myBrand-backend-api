import express from 'express'
import ArticleController from "../../controllers/articleController"
const route = express.Router()

// let object = new ArticleController()
route.post('/create', async (req, res, next) => {
    await ArticleController.createArticle(req, res)
})

route.get("/all", async (req, res, next) => {
    await ArticleController.getAllArticles(req, res)
})

route.get("/:id", async (req, res) => {
    await ArticleController.getArticle(req, res)
})

route.patch("/:id", async (req, res) => {
    await ArticleController.updateArticle(req, res)
})

route.delete("/:id", async (req, res) => {
    await ArticleController.deleteArticle(req, res)
})

export default route