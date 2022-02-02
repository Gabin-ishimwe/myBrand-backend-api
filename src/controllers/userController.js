// import userModel from "../models/user";
import UserService from "../services/userService";
import { hashPassword, comparePassword } from "../helpers/passwordSecurity";
import { generateToken } from "../helpers/jwtFunction";

export default class userController {
     static async userSignUp(req, res, next) {
          try {
               const emailExist = await UserService.userExist(req.body.email)
               if (emailExist) {
                    res.status(404).send({error: "Email arleady exists!!!"})
               } else {
                    const hashed = await hashPassword(req.body.password)
                    const signUpData = {
                         name: req.body.name,
                         email: req.body.email,
                         password: hashed
                    }

                    const creating = await UserService.createUser(signUpData)
                    await res.status(202).send({message: "account registered", data: creating})
               }
          } catch (error) {
               res.status(404).send({error: error})
          }
     }

     static async userLogin(req, res, next) {
          try {
               const emailExist = await UserService.userExist(req.body.email)
               
               if(emailExist) {
                    const validPassword = await comparePassword(req.body.password, emailExist.password)
                    if (validPassword) {
                         const token = await generateToken({_id: emailExist.id, email: emailExist.email})
                         res.status(202).header("authenticate", token).send({message: "Logged in successful!!!", access: token})
                    }

                    else {
                         res.status(400).send({error: "invalid password!!!"})
                    }
               }
               else {
                    res.status(404).send({message: "email doesn't exist!!!"})
               }
          } catch (error) {
               console.log(error)
               res.status(404).send({error: error})
          }
     }
}