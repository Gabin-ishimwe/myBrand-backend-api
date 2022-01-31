import express from 'express'
import ArticleController from "../../controllers/articleController"
import CommentController from '../../controllers/commentController'
import multer from "multer"
import { fileFilter } from '../../helpers/fileFilter'
const route = express.Router()
const storageFile = multer.diskStorage({}) // take none because image will be upload on cloudinary no locally
const upload = multer({storage: storageFile, file: fileFilter})

route.post('/', upload.single("image"),  ArticleController.createArticle)

route.get("/", ArticleController.getAllArticles)

route.get("/:id", ArticleController.getArticle)

route.patch("/:id", upload.single("image"), ArticleController.updateArticle)

route.delete("/:id", ArticleController.deleteArticle)

route.post("/:id/addComment", CommentController.createComment)

route.get("/:id/deleteComments", CommentController.deleteComments)

route.get("/:id/deleteOneComment/:commentNum", CommentController.deleteOneComment)

export default route