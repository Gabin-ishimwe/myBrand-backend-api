import ArticleServices from "../services/articleServices"
import dbSchema from "../models/article"
export default class ArticleController {
    // TODO Don't access database from this file you only needs
    // constructor(_dbSchema) {
    //     this.schema = dbSchema
    // }
    static async createArticle(req, res) { 
        const newArticle  = new dbSchema({
            title: req.body.title,
            content: req.body.content
        })
        await ArticleServices.createArticle(newArticle)
        res.send(newArticle)
    }
    static async getAllArticles(req, res, next) { 
        const all = await ArticleServices.getAllArticles()
        res.send(all)
    }
    static async getArticle(req, res, next) {
        const getOne = await ArticleServices.getArticle(req.params.id)
        res.send(getOne)
    }
    static async updateArticle(req, res, next) {
        const updating = await ArticleServices.updateArticle(req.params.id)
        console.log(updating)
        if(req.body.title){
            updating.title = req.body.title
        }
        if(req.body.content) {
            updating.content = req.body.content
        }
        
        await updating.save()

        res.send(updating)
    }
    static async deleteArticle(req, res, next) {
        const removed = await ArticleServices.deleteArticle(req.params.id)
        res.send(removed)
     }
}

