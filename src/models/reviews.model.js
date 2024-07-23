import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviewer",
    },

    review_date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },

    acceptance: {
      type: String,
      required: true,
    },

    total_score: {
      type: Number,
      require: true,
    },

    qus_ans: [
      {
        qus: { type: String, required: true },
        ans: { type: String, required: true },
      },
    ],

    gradding: [
      {
        max_grade: { type: String, required: true },
        score: { type: Number, require: true },
        min_grade: { type: String, required: true },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    comments: {
      type: String,
      required: true,
    },

    additional_information: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;
