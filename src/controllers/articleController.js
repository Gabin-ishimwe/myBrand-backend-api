import ArticleServices from "../services/articleServices"
import dbSchema from "../models/article"
import { uploading } from "../helpers/uploadFile"
import res from "express/lib/response"
export default class ArticleController {
    static async createArticle(req, res) { 
        try {
            req.body.image = await uploading(req, res)
            const newArticle  = new dbSchema({
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
            })
            await ArticleServices.createArticle(newArticle)
            // console.log("saved article")
            res.status(202).send({message: "article created", data: newArticle})

        }catch(error) {
            res.status(404).send({error: "Image not uploaded"})
        }
    }
    static async getAllArticles(req, res, next) { 
        try {
            const all = await ArticleServices.getAllArticles()
            res.status(202).send({message:"all article!!!!", data:all})
        } catch (error) {
            res.status(404).send({error: error})
            
        }
        
    }
    static async getArticle(req, res, next) {
        try {
            const getOne = await ArticleServices.getArticle(req.params.id)
            res.status(202).send(getOne)
        } catch (error) {
            res.status(404).send({error: error})
            
        }
        
    }
    static async updateArticle(req, res, next) {
        try {
            const updating = await ArticleServices.updateArticle(req.params.id)
        
            if(req.body.title){
                updating.title = req.body.title
                // console.log("updating title....")
            }
            if(req.body.content) {
                updating.content = req.body.content
            }

            if(req.body.image) {
                req.body.image = await uploading(req, res)
                updating.image = req.body.image
            }
            res.status(202).send({message: "article updated!!!",data:updating})
            
            
            await updating.save()
            } catch (error) {
                res.status(404).send({error: error})
            
        }
        
        
    }
    static async deleteArticle(req, res, next) {
        try {
           const removed = await ArticleServices.deleteArticle(req.params.id)
            res.status(202).send({message: "article deleted"}) 
        } catch (error) {
            res.status(404).send({error: error})
            
        }
        
    }

}

