import Joi from "@hapi/joi";

export const querySchema = Joi.object({
     name: Joi.string().required().messages({
          "string.empty": "Name is required!!!", 
          "any.required": "Name is required!!!"
     }),
     email: Joi.string().required().email().messages({
          "string.empty": "Email is required!!!",
          "any.required": "Email is required!!!",
          "string.email": "Email is not valid!!!!",

     }),
     message: Joi.string().required().messages({
          "string.empty": "Message is required!!!",
          "string.required": "Message is required!!!"
     }),
     location: Joi.string().required().messages({
          "string.empty": "Location is required!!!", 
          "string.required": "Location is required!!!"
     })
})