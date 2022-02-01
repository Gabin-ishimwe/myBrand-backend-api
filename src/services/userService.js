import userModel from "../models/user"

export default class UserService {
     static async createUser(data) {
          const signUp = await userModel(data)
          signUp.save()
          return signUp
     }

     static async userExist(data) {
          const accountExist = await userModel.findOne({email: data})
          if(accountExist) {
               return accountExist
          }
          else {
               return false
          }
     }
}