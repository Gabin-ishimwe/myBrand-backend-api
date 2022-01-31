import QueryService from "../services/queryServices"
import queryModel from "../models/query"

export default class QueryController {
     static async creatingQuery(req, res){
          try {
               const creating = new queryModel({
               name: req.body.name,
               email: req.body.email,
               message: req.body.message,
               location: req.body.location,
               })

               await QueryService.createQuery(creating)
               res.status(202).send({message: "query created", data: creating})   
          } catch (error) {
               res.status(404).send({error: error})
          }
          
     }

     static async getAllQueries(req, res) {
          try {
               const all = await QueryService.getAllQueries()
               res.status(202).send(all)  
          } catch (error) {
               res.status(404).send({error: error})
          }
          
     }

     static async deleteQueries(req, res) {
          try {
               const deleting = await QueryService.deleteQueries(req.params.id)
               res.status(202).send({message: "query deleted"})
               
          } catch (error) {
               res.status(404).send({error: error})
          }
     }

     static async getOneQuery(req, res) {
          try {
               if (req.params.id) {
                    const oneQuery = await QueryService.getOneQuery(req.params.id)
                    res.status(202).send(oneQuery)
               }
               else {
                    res.status(205).send({message: "query has been deleted"})
               }
               
          }catch(error) {
               res.status(404).send({error: error})
          }
     }
}