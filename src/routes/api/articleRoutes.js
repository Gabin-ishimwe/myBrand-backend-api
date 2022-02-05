import express from 'express'
import ArticleController from "../../controllers/articleController"
import CommentController from '../../controllers/commentController'
import multer from "multer"
import { fileFilter } from '../../helpers/fileFilter'
import ArticleValidation from '../../validations/articlevalidation/articleValidation'
import CommentValidation from '../../validations/commentValidation/commentValidation'
import { authenticateApi } from '../../middlewares/authentication'
const route = express.Router()
const storageFile = multer.diskStorage({}) // take none because image will be upload on cloudinary no locally
const upload = multer({storage: storageFile, file: fileFilter})

route.post('/', authenticateApi, upload.single("image"), ArticleValidation.creatingArticle, ArticleController.createArticle)

route.get("/", ArticleController.getAllArticles)

route.get("/:id", ArticleController.getArticle)

route.patch("/:id", authenticateApi, upload.single("image"), ArticleController.updateArticle)

route.delete("/:id", authenticateApi, ArticleController.deleteArticle)

route.post("/:id/addComment", CommentValidation.creatingComment, CommentController.createComment)

route.delete("/:id/deleteComments", authenticateApi, CommentController.deleteComments)

route.delete("/:id/deleteOneComment/:commentNum", authenticateApi,CommentController.deleteOneComment)

export default route