import mongoose from "mongoose";

const conferenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  host: {
    type: String,
    default: "",
  },

  cohosts: {
    type: [String],
    default: [],
  },

  status: {
    type: String,
    default: "active",
  },

  short_name: {
    type: String,
    unique: true,
  },

  website: {
    type: String,
    default: "",
  },

  venue: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  place: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "",
  },

  state: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  start_date: {
    type: Date,
    default: Date.now,
  },

  end_date: {
    type: Date,
    default: Date.now,
  },

  date_paper: {
    type: Date,
    default: Date.now,
  },

  theme: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  tags: {
    type: [String],
    default: [],
  },

  logo: {
    type: String,
    default: "",
  },

  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  tripConfirmations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripConfirmation",
    },
  ],

  galery: [
    {
      type: String,
    },
  ],

  paper: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manuscript",
    },
  ],
});

const Conference = mongoose.model("Conference", conferenceSchema);

export default Conference;
