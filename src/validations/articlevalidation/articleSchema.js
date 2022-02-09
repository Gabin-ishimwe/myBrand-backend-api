import joi from "@hapi/joi"

export const articleSchema = joi.object({
     title: joi.string().required().messages({
          "string.empty": "Article title required!!!",
          "string.max": "Article name must not exceed 100 characters!!!",
          "any.required": "Article title required!!!"
     }),
     content: joi.string().min(100).required().messages({
          "string.empty": "Article content required!!!",
          "string.min": "Article content must be of min 100 characters!!!",
          "any.required": "Article title required!!!"
     }),

     likes: joi.number(),

     comments: joi.array()
});