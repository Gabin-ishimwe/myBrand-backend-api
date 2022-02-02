import {querySchema} from "./querySchema"

export default class QueryValidation {
     static async createQuery(req, res, next) {
          const validating = querySchema.validate(req.body)
          if(validating.error) {
               res.status(400).send({error: validating.error.details[0].message})
          }
          else {
               next()
          }
     }
}