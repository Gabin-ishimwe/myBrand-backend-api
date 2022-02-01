import joi from "@hapi/joi"

export const articleSchema = joi.object({
     title: joi.string().max(100).required(),
     content: joi.string().required(),
});