import queryModel from "../models/query"

export default class QueryService {

     static async createQuery(data) {
          return await data.save()
     }

     static async getAllQueries() {
          return await queryModel.find()
     }

     static async deleteQueries(id) {
          return await queryModel.remove({_id:id})
     }
}