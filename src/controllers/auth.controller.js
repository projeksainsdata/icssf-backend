import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import * as validate from "../validate/user.validate.js";
import nodemailer from "nodemailer";
import config from "../../config/config.js";
import emailVerifyTemplate from "../helpers/emailVerify.js";

export default class AuthController {
  services = new AuthService();
  userService = new UserService();
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  // register user
  register = async (req, res, next) => {
    try {
      const { value, error } = validate.userRegisterSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // check if user already exists
      const user = await this.userService.findByEmailLogin(value.email);
      if (user.length) {
        throw new ResponseError("User already exists", 400);
      }

      // hash password
      value.password = await this.services.hashPassword(value.password);
      // create user
      const newUser = await this.userService.createUser(value);
      return ResponseApi.success(res, newUser);
    } catch (error) {
      next(error);
    }
  };

  // login user
  login = async (req, res, next) => {
    try {
      const { value, error } = validate.userLoginSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // check if user exists
      const user = await this.userService.findByEmailLogin(value.email);
      if (!user.length) {
        throw new ResponseError("Invalid email or password", 400);
      }

      // compare password
      const isMatch = await this.services.comparePassword(
        value.password,
        user[0].password
      );
      if (!isMatch) {
        throw new ResponseError("Invalid email or password", 400);
      }

      // delete refresh token if exists for user
      await this.userService.deleteRefreshTokenByUserId(user[0]._id);

      // create access and refresh token
      const tokens = await this.services.createAccessAndRefreshToken({
        user: {
          _id: user[0]._id,
          email: user[0].email,
          username: user[0].username,
          role: user[0].role,
          isVerified: user[0].isVerified,
          profile_img: user[0].profile_img,
        },
      });
      return ResponseApi.success(res, tokens);
    } catch (error) {
      next(error);
    }
  };

  // refresh token
  refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ResponseError("Refresh token is required", 400);
      }
      const user = req.user;

      // find refresh token
      const token = await this.services.findRefreshToken(refreshToken);
      if (!token) {
        throw new ResponseError("Invalid refresh token", 400);
      }

      // verify or delete refresh token
      const Token = await this.services.verifyOrDeleteRefreshToken(token);

      // delete refresh token if exists for user
      await this.userService.deleteRefreshTokenByUserId(Token.user._id);

      // create access and refresh token
      const tokens = await this.services.createAccessAndRefreshToken({
        user: user,
      });
      return ResponseApi.success(res, tokens);
    } catch (error) {
      next(error);
    }
  };

  // logout user
  logout = async (req, res, next) => {
    try {
      // get user from request
      const user = req.user;
      // delete refresh token if exists for user
      await this.userService.deleteRefreshTokenByUserId(user._id);
      return ResponseApi.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  // send email verification token
  sendEmailVerification = async (req, res, next) => {
    try {
      // get user from request
      const user = req.user;
      // check is user is already verified
      if (user.isVerified) {
        throw new ResponseError("Email is already verified", 400);
      }
      // create email verify token
      const token = await this.services.createEmailVerifyToken(user._id);
      const link = `${config.email.verifyUrl}/${token}`;
      // send email
      await this.transporter.sendMail({
        from: config.email.user,
        to: user.email,
        subject:
          "Email Verification | ICSSF Institute Technology Sumatera 2024",
        html: emailVerifyTemplate(user.email, link, "Email"),
      });
      return ResponseApi.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  // verify email
  verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.params;
      if (!token) {
        throw new ResponseError("Token is required", 400);
      }

      // get email verify token
      const emailVerify = await this.services.getEmailVerifyToken(token);
      if (!emailVerify) {
        throw new ResponseError("Invalid token", 400);
      }

      // update verification status
      await this.userService.updateVerificationStatus(emailVerify.user_id);
      return ResponseApi.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  // forgot password
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        throw new ResponseError("Email is required", 400);
      }

      // check if user exists
      const user = await this.userService.findByEmailLogin(email);
      if (!user.length) {
        throw new ResponseError("Invalid email", 400);
      }

      // create reset token
      const resetToken = await this.services.createResetPasswordToken(
        user[0]._id
      );
      // send email

      const link = `${config.email.resetUrl}/${resetToken}`;

      await this.transporter.sendMail({
        from: config.email.user,
        to: user[0].email,
        subject: "Reset Password",
        html: emailVerifyTemplate(user[0].email, link, "Reset Password"),
      });
      return ResponseApi.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  // reset password
  resetPassword = async (req, res, next) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      if (!token) {
        throw new ResponseError("Token is required", 400);
      }
      if (!password) {
        throw new ResponseError("Password is required", 400);
      }

      // get reset token
      const resetToken = await this.services.getResetToken(token);
      if (!resetToken) {
        throw new ResponseError("Invalid token", 400);
      }

      // hash password
      const hashedPassword = await this.services.hashPassword(password);
      // update password
      await this.userService.updatePassword(resetToken.user_id, hashedPassword);

      // delete reset token
      await this.services.deleteResetToken(token);
      // redirect to frontend
      return ResponseApi.success(res, { message: "Password updated" });
    } catch (error) {
      next(error);
    }
  };

  // resend email verification
  resendEmail = async (req, res, next) => {
    try {
      // get user from request
      const user = req.user;
      // create email verify token
      const token = await this.services.createEmailVerifyToken(user._id);
      const link = `${config.email.verifyUrl}/${token}`;
      // send email
      await this.transporter.sendMail({
        from: config.email.user,
        to: user.email,
        subject:
          "Email Verification | ICSSF Institute Technology Sumatera 2024",
        html: emailVerifyTemplate(user.email, link, "Email"),
      });
      return ResponseApi.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  // confirm email
  confirmEmail = async (req, res, next) => {
    try {
      const { token } = req.params;
      if (!token) {
        throw new ResponseError("Token is required", 400);
      }

      // get email verify token
      const emailVerify = await this.services.getEmailVerifyToken(token);
      if (!emailVerify) {
        throw new ResponseError("Invalid token", 400);
      }

      // update verification status
      await this.userService.updateVerificationStatus(
        emailVerify.user_id,
        true
      );

      // delete email verify token
      await this.services.deleteEmailVerifyToken(token);
      // redirect to frontend
      return ResponseApi.success(res, { message: "Email verified" });
    } catch (error) {
      next(error);
    }
  };
}
