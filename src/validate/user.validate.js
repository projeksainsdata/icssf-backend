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

export const userForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const userResetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  password2: Joi.ref("password"),
  token: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  password2: Joi.ref("password"),
  bio: Joi.string(),
  profile_img: Joi.string(),
  social_links: Joi.object({
    youtube: Joi.string(),
    instagram: Joi.string(),
    facebook: Joi.string(),
    linkedin: Joi.string(),
    twitter: Joi.string(),
    github: Joi.string(),
    website: Joi.string(),
  }),
  personal_info: Joi.object({
    googleShId: Joi.string(),
    orcidId: Joi.string(),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    organization: Joi.string(),
    position: Joi.string(),
    degree: Joi.string(),
    phone: Joi.string(),
    bio: Joi.string(),
  }),
});

export const userUpdatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  password2: Joi.string().required(),
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

// create user schema for admin
export const UserCreateByAdminSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  status: Joi.string().required(),
});
