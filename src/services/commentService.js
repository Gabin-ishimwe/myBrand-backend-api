import commentSchema from "../models/comment";
import dbSchema from "../models/article"

export default class CommentService {
     static async createComments(id) {
          return await dbSchema.findById(id)
     }

     static async deleteComments(id) {
          return await dbSchema.findById(id)
     }

     static async deleteOneComment(id) {
          return await dbSchema.findById(id)
     }
}