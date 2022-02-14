import { articleSchema } from "./articleSchema";


export default class ArticleValidation {
     static async creatingArticle(req, res, next) {
          const validating = await articleSchema.validate(req.body)
          // console.log(req.body)
          if(validating.error) {
               // console.log(validating.error)
               res.status(400).send({
                    errorMessage: validating.error.details[0].message,
               })
          }
          else {
               next()
          }
     }

     // static async updatingArticle(req, res, next) {
     //      const validating = await articleSchema.validate(req.body)
     //      if(validating.error["_original"].title ==="" || validating.error["_original"].content ==="") {
     //           res.send({errorMessage: validating.error.details[0].message})
     //      }

     //      else {
     //           next()
     //      }
     // }     
}