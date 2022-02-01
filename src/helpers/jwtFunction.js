import Jwt from "jsonwebtoken";

import "dotenv/config";

const secretKey = process.env.TOKEN_SECRETE;
// console.log(secretKey)
export const generateToken = (payload, expires="7d") => {
     const token = Jwt.sign(payload, secretKey, {expiresIn: expires})
     // console.log(token)
     return token
}

export const decodeToke = async(token) => {
     const verify = Jwt.verify(token, secretKey)
     return verify
}