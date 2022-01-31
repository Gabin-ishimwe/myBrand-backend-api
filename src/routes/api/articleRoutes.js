import express from 'express'
import ArticleController from "../../controllers/articleController"
import CommentController from '../../controllers/commentController'
import multer from "multer"
import { fileFilter } from '../../helpers/fileFilter'
const route = express.Router()
const storageFile = multer.diskStorage({}) // take none because image will be upload on cloudinary no locally
const upload = multer({storage: storageFile, file: fileFilter})

route.post('/create', upload.single("image"), async (req, res, next) => {
    console.log("route run")
    await ArticleController.createArticle(req, res)
})

route.get("/all", async (req, res, next) => {
    await ArticleController.getAllArticles(req, res)
})

route.get("/:id", async (req, res) => {
    await ArticleController.getArticle(req, res)
})

route.patch("/:id", upload.single("image"),async (req, res) => {
    await ArticleController.updateArticle(req, res)
})

route.delete("/:id", async (req, res) => {
    await ArticleController.deleteArticle(req, res)
})

route.post("/:id/addComment", async (req, res) => {
    await CommentController.createComment(req, res)
})

route.get("/:id/deleteComments", async (req, res) => {
    await CommentController.deleteComments(req, res)
})

route.get("/:id/deleteOneComment/:commentNum", async (req, res) => {
    await CommentController.deleteOneComment(req, res)
})

export default route