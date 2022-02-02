import joi from "@hapi/joi"

export const articleSchema = joi.object({
     title: joi.string().max(100).required().messages({
          "string.empty": "Article title required!!!",
          "string.min": "Article name must not exceed 100 characters!!!",
          "any.required": "Article title required!!!"
     }),
     content: joi.string().min(100).required().messages({
          "string.empty": "Article title required!!!",
          "string.min": "Article content must be of min 100 characters!!!",
          "any.required": "Article title required!!!"
     }),
});