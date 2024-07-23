import mongoose from "mongoose";

const ReviewerSchema = new mongoose.Schema({
  countOfCompletedReviews: {
    type: Number,
    default: 0,
  },

  majorField: {
    type: String,
    required: false,
  },

  minorFields: {
    type: [String],
    required: false,
  },
  verified: {
    type: Boolean,
    default: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
ReviewerSchema.index({ user: 1 }, { unique: true });

const ReviewerModel = mongoose.model("Reviewer", ReviewerSchema);

ReviewerModel.createIndexes();

export default ReviewerModel;
