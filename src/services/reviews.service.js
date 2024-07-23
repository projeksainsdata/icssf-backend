import ReviewsModel from "../models/reviews.model.js";
import ResponseError from "../responses/error.response.js";

export default class ReviewsService {
  // create reviews service that will handle all reviews related logic here
  // crud reviews

  async createReviews(data) {
    try {
      return await ReviewsModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readReviews() {
    try {
      return await ReviewsModel.find();
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async updateReviews(id, data) {
    try {
      return await ReviewsModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async deleteReviews(id) {
    try {
      return await ReviewsModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  async readReviewsById(id) {
    try {
      return await ReviewsModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }

  searchReviews = async ({ page, perPage, reviews_id, acceptance, status }) => {
    try {
      return await ReviewsModel.find({
        where: {
          OR: [
            { reviews_id: { contains: reviews_id } },
            { acceptance: { contains: acceptance } },
            { status: { contains: status } },
          ],
        },
        limit: perPage,
        skip: (page - 1) * perPage,
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  countSearchReviews = async ({ reviews_id, acceptance, status }) => {
    try {
      return await ReviewsModel.count({
        where: {
          OR: [
            { reviews_id: { contains: reviews_id } },
            { acceptance: { contains: acceptance } },
            { status: { contains: status } },
          ],
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  async readReviewsByReviewsId(reviews_id) {
    try {
      return await ReviewsModel.find({ reviews_id });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  }
}
