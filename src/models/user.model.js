import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;
const profile_imgs_name_list = ["ellipse","ellipseFilled","line","polygon","polygonFilled","rectangle","rectangleFilled"];
const profile_imgs_collections_list = ["shapes"];

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["member", "admin", "commitee"],
      default: "member",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: String,
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      required: false,
    },
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    profile_img: {
      type: String,
      // get a random profile image from dicebear

      default: () => {
        return `https://api.dicebear.com/9.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`;
      },
    },
    linkedin: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.index(
  { fullname: "text", bio: "text" },
  {
    weights: {
      fullname: 5,
      bio: 1,
    },
  }
);

const UserModel = model("users", UserSchema);
UserModel.createIndexes();
export default UserModel;
