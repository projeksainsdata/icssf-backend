import UserServices from "../services/user.service.js";
import AuthService from "../services/auth.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";
import * as userValidate from "../validate/user.validate.js";

class UserControllers {
  service = new UserServices();
  authService = new AuthService();

  // get all users and apply pagination
  getUsers = async (req, res, next) => {
    try {
      // check pagination req.query.page and req.query.perPage are present or not set default value
      if (!req.page && !req.perPage) {
        req.page = 1;
        req.perPage = 10;
      }
      // validate the query parameters
      const { value, error } = userValidate.searchUserSchema.validate(
        req.query
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: req.page,
        perPage: req.perPage,
        total: await this.service.countSearchUsers(value),
      };
      // call the service
      const users = await this.service.searchUsers(value);
      // send the response
      return ResponseApi.success(res, users, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // create a new user by admin
  createUser = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.UserCreateByAdminSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the servic
      const user = await this.service.createUser(value);
      // send the response
      return ResponseApi.created(res, user);
    } catch (error) {
      return next(error);
    }
  };

  // update user by user
  updateUser = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.userUpdateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // check if the user is updating his/her own profile
      if (req.user._id !== req.params.id) {
        throw new ResponseError("Unauthorized", 401);
      }

      // check if the user is updating the password
      if (value.password) {
        const { error } = userValidate.userUpdatePasswordSchema.validate({
          password: value.password,
          password2: value.password2,
        });
        if (error) {
          throw new ResponseError(error.message, 400);
        }

        // encrypt the password
        value.password = await this.authService.hashPassword(value.password);
      }

      // check if user is updating profile image
      if (req.file) {
        // logic to upload image to cloudinary or s3 bucket
        value.profile_img = req.file.path;
      }

      // call the service
      const user = await this.service.updateUser(req.user._id, value);
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  // update user by admin
  updateUserByAdmin = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.updateUserSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const user = await this.service.updateUser(req.params.id, value);
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  // get user by id
  getUserById = async (req, res, next) => {
    try {
      // call the service
      const user = await this.service.findById(req.params.id);
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  // delete user by admin
  deleteUser = async (req, res, next) => {
    try {
      // call the service
      await this.service.deleteUser(req.params.id);
      // send the response
      return ResponseApi.success(res, "User deleted successfully");
    } catch (error) {
      return next(error);
    }
  };

  // update user verification status
  updateVerificationStatus = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.updateUserSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const user = await this.service.updateVerificationStatus(
        req.params.id,
        value.status
      );
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  searchUser = async (req, res, next) => {
    try {
      // check pagination req.query.page and req.query.perPage are present or not set default value
      if (!req.query.page && !req.query.perPage) {
        req.query.page = 1;
        req.query.perPage = 10;
      }

      const { value, error } = userValidate.searchUserSchema.validate(
        req.query
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: req.query.page,
        perPage: req.query.perPage,
        total: await this.service.countSearchUsers(value),
      };
      // call the service
      const users = await this.service.searchUsers(value);
      // send the response
      return ResponseApi.success(res, users, pagination);
    } catch (error) {
      return next(error);
    }
  };
}

export default UserControllers;
