import Joi from "joi"

export const createContentSchema = Joi.object({
  title: Joi.string().max(255).required(),
  body: Joi.string().required(),
  pemateriId: Joi.number().required(),
})

export const updateContentSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  body: Joi.string().optional(),
  pemateriId: Joi.number().optional(),
}).or("title", "body", "pemateriId")
