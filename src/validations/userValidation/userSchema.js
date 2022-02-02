import Joi from "@hapi/joi";

export const userSchema = Joi.object({
     name: Joi.string().max(100).required().messages({
          "string.empty": "Name is required!!!",
          "string.max": "Name must not exceed 100 characters!!!",
          "any.required": "Name is required!!!"
     }),
     email: Joi.string().email().required().messages({
          "string.empty": "Email is required!!!",
          "any.required": "Email is required!!!",
          "string.email": "Email is not valid!!!!",
     }),
     password: Joi.string().min(8).max(10).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).messages({
          "string.empty": "Password is required!!!",
          "string.required": "Password is required!!!",
          "string.min": "Password must have at least 8 characters!!!",
          "string.max": "Password must not exceed 10 characters!!!",
          "string.pattern.base": "Password must container at least one special character and number!!!"
     })
})

export const userLoginSchema = Joi.object({
     email: Joi.string().email().required().messages({
          "string.empty": "Email is required!!!",
          "any.required": "Email is required!!!",
          "string.email": "Email is not valid!!!!",
     }),
     password: Joi.string().min(8).max(10).required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).messages({
          "string.empty": "Password is required!!!",
          "any.required": "Password is required!!!",
          "string.min": "Password must have at least 8 characters!!!",
          "string.max": "Password must not exceed 10 characters!!!",
          "string.pattern.base": "Password must container at least one special character and number!!!"
     })
})