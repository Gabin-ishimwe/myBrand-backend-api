import { commentSchema } from "./commentSchema";

export default class CommentValidation {
     static async creatingComment(req, res, next) {
          const validating = await commentSchema.validate(req.body)
          if(validating.error) {
               res.status(400).send({error: validating.error.details[0].message})
          }
          else {
               next()
          }
     }
}