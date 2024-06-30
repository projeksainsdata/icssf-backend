import ResponseError from "../responses/error.response.js";

export default function (req, res, next) {
  if (!req.user.role.includes("admin")) {
    throw new ResponseError("Access denied", 403);
  }
  next();
}
