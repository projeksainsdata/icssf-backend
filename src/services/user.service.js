import UserModel from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import ResponseError from "../responses/error.response.js";

export default class UserService {
  async createUser(user) {
    try {
      // create user in db and select only email and name fields
      const newUser = await UserModel.create({
        ...user,
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

  async findByUsername(username) {
    try {
      return await UserModel.find({ username });
    } catch (error) {
      throw error;
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

  // search users
  async searchUsers(query) {
    try {
      const { page, perPage, ...searchQuery } = query;
      const users = await UserModel.find(searchQuery)
        .skip((page - 1) * perPage)
        .limit(perPage);
      return users;
    } catch (error) {
      throw error;
    }
  }

  // update user
  async updateUser(userId, user) {
    try {
      return await UserModel.findByIdAndUpdate(userId, user, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // count search users
  async countSearchUsers(query) {
    try {
      return await UserModel.countDocuments(query);
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteUser(userId) {
    try {
      return await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}
