import Joi from "joi";

export const reviewCreateSchema = Joi.object({
  reviews_id: Joi.string().required(),
  review_date: Joi.date().required(),
  acceptance: Joi.string().required(),
  total_score: Joi.number().required(),
  qus_ans: Joi.array().items(
    Joi.object({
      qus: Joi.string().required(),
      ans: Joi.string().required(),
    })
  ),

  gradding: Joi.array().items(
    Joi.object({
      max_grade: Joi.string().required(),
      score: Joi.number().required(),
      min_grade: Joi.string().required(),
    })
  ),
  status: Joi.string()
    .valid("pending", "accepted", "rejected")
    .default("pending"),
  comments: Joi.string().required(),
  additional_information: Joi.string().required(),
});

export const reviewUpdateSchema = Joi.object({
  reviews_id: Joi.string(),
  review_date: Joi.date(),
  acceptance: Joi.string(),
  total_score: Joi.number(),
  qus_ans: Joi.array().items(
    Joi.object({
      qus: Joi.string(),
      ans: Joi.string(),
    })
  ),

  gradding: Joi.array().items(
    Joi.object({
      max_grade: Joi.string(),
      score: Joi.number(),
      min_grade: Joi.string(),
    })
  ),
  status: Joi.string().valid("pending", "accepted", "rejected"),
  comments: Joi.string(),
  additional_information: Joi.string(),
});

export const reviewQuerySchema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  reviews_id: Joi.string().default(""),
  acceptance: Joi.string().default(""),
  status: Joi.string().valid("pending", "accepted", "rejected", "").default(""),
});
