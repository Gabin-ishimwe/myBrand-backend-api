import QueryService from "../services/queryServices"
import queryModel from "../models/query"

export default class QueryController {
     static async creatingQuery(req, res){
          const creating = new queryModel({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
          location: req.body.location,
          })

          await QueryService.createQuery(creating)
          res.status(202).send(creating)
     }

     // static async getAllQueries(req, res) {
     //      const all = QueryService.getAllQueries()
     //      await res.send(all)
     // }

     // static async deleteQueries(req, res) {
     //      const deleting = QueryService.deleteQueries(req.params.id)
     // }
}