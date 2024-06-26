import Joi from "joi";

export const userRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  password2: Joi.string().required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  password2: Joi.string(),
  bio: Joi.string(),
  profile_img: Joi.string(),
  linkedin: Joi.string(),
  instagram: Joi.string(),
});

export const userUpdatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  password2: Joi.string().required(),
});

export const userUpdateSocialLinksSchema = Joi.object({
  linkedin: Joi.string().required(),
  instagram: Joi.string().required(),
});


