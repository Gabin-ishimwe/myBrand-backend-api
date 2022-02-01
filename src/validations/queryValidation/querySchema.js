import Joi from "@hapi/joi";

export const querySchema = Joi.object({
     name: Joi.string().required(),
     email: Joi.string().required().email(),
     message: Joi.string().required(),
     location: Joi.string().required()
})