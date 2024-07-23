import Joi from "joi";

export const abstractCreateSchema = Joi.object({
  title: Joi.string().required(),
  abstract: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()).default([]),
  presenter_information: Joi.object({
    presenter_name: Joi.string().required(),
    presenter_email: Joi.string().email().required(),
    presenter_preferrec: Joi.string().required(),
  }),
  authors: Joi.array().items(Joi.string()),
  co_authors: Joi.array().items(Joi.string()),
  topics: Joi.array().items(Joi.string()),
  conference: Joi.string().required(),
  file: Joi.string().required(),
});

export const abstractUpdateSchema = Joi.object({
  title: Joi.string(),
  abstract: Joi.string(),
  keywords: Joi.array().items(Joi.string()),
  presenter_information: Joi.object({
    presenter_name: Joi.string(),
    presenter_email: Joi.string().email(),
    presenter_preferrec: Joi.string(),
  }),
  authors: Joi.array().items(Joi.string()),
  co_authors: Joi.array().items(Joi.string()),
  topics: Joi.array().items(Joi.string()),
  conference: Joi.string(),
  file: Joi.string(),
});

export const abstractIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const abstractDeleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const abstractSearchSchema = Joi.object({
  title: Joi.string().default(""),
  abstract: Joi.string().default(""),
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  sort: Joi.string().default("createdAt"),
  order: Joi.string().default("desc"),
});
