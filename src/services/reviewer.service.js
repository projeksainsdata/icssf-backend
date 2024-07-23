import ReviewerModel from "../models/reviewer.model.js";
import ResponseError from "../responses/error.response.js";

export default class ReviewerService {
  // create reviewer service that will handle all reviewer related logic here
  // crud reviewer
  async readReviewerByUserId(id) {
    try {
      return await ReviewerModel.findOne({ user: id });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async createReviewer(data) {
    try {
      return await ReviewerModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readReviewer() {
    try {
      return await ReviewerModel.find();
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async updateReviewer(user, data) {
    try {
      return await ReviewerModel.findOneAndUpdate({ user }, data, {
        new: true,
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async deleteReviewer(user) {
    try {
      return await ReviewerModel.findOneAndDelete({ user });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readReviewerByUserId(user) {
    try {
      return await ReviewerModel.findOne({ user });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }
}
