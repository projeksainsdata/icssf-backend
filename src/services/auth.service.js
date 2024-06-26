import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import RefreshToken from "../models/refreshToken.model.js";
import EmailVerify from "../models/emailVerify.model.js";
import ResetPassword from "../models/resetPassword.model.js";
import config from "../../config/config.js";
import ResponeError from "../responses/error.response.js";

export default class AuthService {
  // generate token
  generateToken(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiration,
    });
  }

  // generate refresh token
  async generateRefreshToken(user_id) {
    let refreshToken = await RefreshToken.createToken(user_id);
    return refreshToken;
  }

  // verify token
  verify(token) {
    return jwt.verify(token, config.jwt.secret);
  }

  // create access and refresh token
  async createAccessAndRefreshToken(payload) {
    return {
      access: this.generateToken(payload),
      refresh: await this.generateRefreshToken(payload.user),
    };
  }

  // find refresh token
  async findRefreshToken(token) {
    return RefreshToken.findOne({ token })
      .populate("user")
      .select("-user.password");
  }

  // verify or delete refresh token
  async verifyOrDeleteRefreshToken(refreshToken) {
    if (RefreshToken.verifyExpiration(refreshToken)) {
      await RefreshToken.deleteOne({ token: refreshToken.token });
      throw new ResponeError(401, "Refresh token expired");
    } else {
      return refreshToken;
    }
  }

  // compare password
  comparePassword(password, userPassword) {
    return bcrypt.compare(password, userPassword);
  }

  // hash password
  hashPassword(password) {
    return bcrypt.hash(password, config.bcrypt.saltRounds);
  }

  // delete refresh token
  async deleteRefreshToken(token) {
    return RefreshToken.deleteOne({ token });
  }

  // delete refresh token by user id
  async deleteRefreshTokenByUserId(userId) {
    return RefreshToken.deleteMany({ user: userId });
  }

  // create email verify token
  async createEmailVerifyToken(user_id) {
    return EmailVerify.createToken(user_id);
  }

  // get email verify token
  async getEmailVerifyToken(token) {
    return EmailVerify.findOne({ token });
  }

  // delete email verify token
  async deleteEmailVerifyToken(token) {
    return EmailVerify.deleteOne({ token });
  }

  // verify email verify token
  async verifyEmailVerifyToken(emailVerifyToken) {
    if (EmailVerify.verifyExpiration(emailVerifyToken)) {
      await EmailVerify.deleteOne({ token: emailVerifyToken.token });
      throw new ResponeError(401, "Email verify token expired");
    } else {
      return emailVerifyToken;
    }
  }

  async deleteEmailVerifyTokenByUserId(userId) {
    return EmailVerify.deleteMany({ user: userId });
  }

  // get reset password token
  async getResetPasswordToken(token) {
    return ResetPassword.findOne({ token });
  }

  // create reset password token
  async createResetPasswordToken(user_id) {
    return ResetPassword.createToken(user_id);
  }

  // delete reset password token
  async deleteResetPasswordToken(token) {
    return ResetPassword.deleteOne({
      token,
    });
  }

  // verify reset password token
  async verifyResetPasswordToken(resetPasswordToken) {
    if (ResetPassword.verifyExpiration(resetPasswordToken)) {
      await ResetPassword.deleteOne({ token: resetPasswordToken.token });
      throw new ResponeError(401, "Reset password token expired");
    } else {
      return resetPasswordToken;
    }
  }
}
