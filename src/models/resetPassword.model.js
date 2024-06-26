import mongoose from "mongoose";
import uuidV4 from "../utils/uuid.js";

const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema(
  // users reference
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      // 1h
      default: Date.now() + 60 * 60 * 1000,
      index: { expires: "1h" },
    },
  },
  { timestamps: true }
);
ResetPasswordSchema.statics.createToken = async function (user_id) {
  let _token = uuidV4();
  let _object = new this({
    user_id: user_id,
    token: _token,
  });
  let emailVerify = await _object.save();
  return emailVerify.token;
};

ResetPasswordSchema.statics.verifyExpiration = (token) => {
  return token.expires < new Date().getTime();
};
// auto delete token when expire with expireAfterSeconds
ResetPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
// create index token
ResetPasswordSchema.index({ token: 1 });
const ResetPassword = mongoose.model("resetPassword", ResetPasswordSchema);

export default ResetPassword;
