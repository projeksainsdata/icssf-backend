import mongoose from "mongoose";

const editorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    countOfAcceptedPapers: {
      type: Number,
      default: 0,
    },
    countOfPendingPapers: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: true,
    },

    majorField: {
      type: String,
      required: false,
    },

    minorFields: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

editorSchema.index({ user: 1 }, { unique: true });

export const EditorModel = mongoose.model("Editor", editorSchema);
EditorModel.createIndexes();
export default EditorModel;
