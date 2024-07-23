import mongoose from "mongoose";

const TripConfirmationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    trip: {
      type: String,
      required: true,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    allergies: {
      type: [String],
      default: [],
    },

    specialNeeds: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const TripConfirmationModel = mongoose.model(
  "TripConfirmation",
  TripConfirmationSchema
);
