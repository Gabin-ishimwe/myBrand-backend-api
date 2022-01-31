import commentSchema from "../models/comment";
import CommentService from "../services/commentService";
import dbSchema from '../models/article';

export default class CommentController {
     static async createComment(req, res) {
          try {
               const commentingArticle = await CommentService.createComments(req.params.id)

               const createComment = new commentSchema({
                    content: req.body.content
               })

               await commentingArticle.comments.push(createComment.content)

               await commentingArticle.save()

               // await CommentService.createComments(createComment)
               res.status(202).send({message: "comment created", data: commentingArticle})
          } catch (error) {
               res.status(404).send({error: error})
          }
          
     }

     static async deleteComments(req, res) {
          try {
               const commentingArticle = await CommentService.deleteComments(req.params.id)
               if (commentingArticle.comments.length != 0) {
                    commentingArticle.comments.splice(0, commentingArticle.comments.length)
                    await commentingArticle.save()
                    res.status(202).send({message: "all comments deleted", data: commentingArticle})
               }
               else {
                    res.status(205).send({message: "there are no comments", data: commentingArticle})
               }
          } catch (error) {
               res.status(404).send({error: error})
          }
     }

     static async deleteOneComment(req, res) {
          try {
               const commentingArticle = await CommentService.deleteComments(req.params.id)
               if (commentingArticle.comments.length != 0) {
                    if (req.params.commentNum < commentingArticle.comments.length) {
                         commentingArticle.comments.splice(req.params.commentNum, 1)
                         await commentingArticle.save()
                         res.status(202).send({message: "specified comment deleted", data: commentingArticle})
                    }
                    else {
                         res.status(205).send({message: "there are no comments on that index", data: commentingArticle})
                    }
                    
               }
               else {
                    res.status(205).send({message: "there are no comments", data: commentingArticle})
               }
               
          } catch (error) {
               res.status(404).send({error: error})
          }
     }
}