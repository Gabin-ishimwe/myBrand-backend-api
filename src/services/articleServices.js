// import the model you need to access
import req from "express/lib/request";
import dbSchema from "../models/article";
export default class ArticleServices {
    static async createArticle(data) {
        return await data.save()
     }
    static async getAllArticles() { 
        return await dbSchema.find()
    }
    static async getArticle(id) {
        return await dbSchema.findById(id)
    }
    static async updateArticle(id) {
        return await dbSchema.findById(id)
     }
    static async deleteArticle(id) { 
        return await dbSchema.remove({_id: id})
    }
}