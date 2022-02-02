import Jwt from "jsonwebtoken";
import "dotenv/config"

export const authenticateApi = async (req, res, next) => {
     
     // if (token) {
          try {
               const token = req.headers.authorization.split(" ")[1]
               const verify = await Jwt.verify(token, process.env.TOKEN_SECRETE)
               req.user = verify
               next()
          } catch (error) {
               res.status(401).send("Access denied!!!")
          }
     // } else {
     //      res.status(401).send("Access denied!!!")
     // }
}