import AuthServices from "../services/auth.service.js";
import ResponseError from "../responses/error.response.js";

export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");
  const authService = new AuthServices();
  if (!token) {
    throw new ResponseError("Access denied", 401);
  }
  if (token.split(" ")[0] !== "Bearer") {
    throw new ResponseError("Invalid token", 401);
  }
  try {
    const decoded = authService.verify(token.split(" ")[1]);
    req.user = decoded.user;

    next();
  } catch (err) {
    throw new ResponseError("Invalid token", 401);
  }
}
