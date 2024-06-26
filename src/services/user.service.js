import UserModel from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import ResponseError from "../responses/error.response.js";

export default class UserService {
  async createUser(user) {
    try {
      // create user in db and select only email and name fields
      const newUser = await UserModel.create({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      // return only email and name fields
      return {
        email: newUser.email,
        username: newUser.username,
      };
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  //   findById(id) {
  async findById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByEmailLogin(email) {
    try {
      return await UserModel.find({ email }).select("+password");
    } catch (error) {
      throw error;
    }
  }

  // deleteRefreshTokenByUserId(userId) {
  async deleteRefreshTokenByUserId(userId) {
    try {
      return await RefreshToken.deleteMany({ user: userId });
    } catch (error) {
      throw error;
    }
  }

  // update verification status
  async updateVerificationStatus(userId, status) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { isVerified: status },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(userId, password) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { password },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
