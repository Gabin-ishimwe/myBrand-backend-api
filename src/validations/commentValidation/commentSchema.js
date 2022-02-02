import joi from "@hapi/joi"

export const commentSchema = joi.object({
     name: joi.string().max(100).required().messages({
          "string.empty": "Name is required!!!",
          "string.max": "Name must not exceed 100 characters!!!",
          "any.required": "Name is required!!!"
     }),
     content: joi.string().required().messages({
          "string.empty": "Content required!!!",
          "string.required": "Content is required!!!"
     })
})