import joi from "@hapi/joi"

export const commentSchema = joi.object({
     name: joi.string().max(100).required(),
     content: joi.string().required()
})