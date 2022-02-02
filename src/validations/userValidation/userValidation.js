import { userSchema, userLoginSchema } from "./userSchema";

export default class UserValidation {
     static async userSignIn(req, res, next) {
          const validating = userSchema.validate(req.body)
          if(validating.error) {
               res.status(400).send({error: validating.error.details[0].message})
          }
          else {
               next()
          }
     }

     static async userLogin(req, res, next) {
          const validating = userLoginSchema.validate(req.body)
          if(validating.error) {
               res.status(400).send({error: validating.error.details[0].message})
          }
          else {
               next()
          }
     }
}