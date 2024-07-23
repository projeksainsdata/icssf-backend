import mongoose from "mongoose";

const abstractSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },

    presenter_information: {
      presenter_name: {
        type: String,
        required: true,
      },
      presenter_email: {
        type: String,
        required: true,
      },
      presenter_preferrec: {
        type: String,
        required: true,
      },
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    co_authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],

    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
    },

    file: {
      type: String,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Abstract = mongoose.model("Abstract", abstractSchema);

export default Abstract;
