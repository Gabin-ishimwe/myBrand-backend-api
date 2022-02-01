import bcrypt from "bcryptjs"

export const hashPassword = (plainPassword) => {
     const salt = bcrypt.genSaltSync(10)
     const hash = bcrypt.hashSync(plainPassword, salt)
     return hash
}

export const comparePassword = async (plainPassword, hashedPassword) => {
     const result = bcrypt.compareSync(plainPassword, hashedPassword)
     return result
}