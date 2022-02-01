import Jwt from "jsonwebtoken";
import "dotenv/config"

export const authenticateApi = async (req, res, next) => {
     const token = req.header("authenticate")
     if (token) {
          try {
               const verify = await Jwt.verify(token, process.env.TOKEN_SECRETE)
               req.user = verify
               next()
          } catch (error) {
               res.status(404).send({error: error})
          }
     } else {
          res.status(401).send("Access denied!!!")
     }
}