import Joi from "@hapi/joi";

export const userSchema = Joi.object({
     name: Joi.string().max(100).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(8).max(10).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).message("Password must have at least one special character and a number")
})

export const userLoginSchema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(8).max(10).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).message("Password must have at least one special character and a number")
})