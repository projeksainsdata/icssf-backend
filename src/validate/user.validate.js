import Joi from "joi";

export const userRegisterSchema = Joi.object({
  fullname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  password2: Joi.ref("password"),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  password2: Joi.ref("password"),
  bio: Joi.string(),
  profile_img: Joi.string(),
  fullname: Joi.string(),
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

// search user schema for admin
export const searchUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string(),
  status: Joi.string(),
  page: Joi.number().min(1),
  perPage: Joi.number().min(1),
});

// update user schema for admin
export const updateUserSchema = Joi.object({
  fullname: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string(),
  status: Joi.string(),
});

export const UserCreateByAdminSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  status: Joi.string().required(),
});
