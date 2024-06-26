import errorStatus from "../helpers/errorStatus.js";
import AuthServices from "../services/auth.service.js";
export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");
  const authService = new AuthServices();
  if (!token) {
    const error = new Error("You Must Login | No access token found");
    error.statusCode = 403;
    throw error;
  }
  if (token.split(" ")[0] !== "Bearer") {
    throw new Error("Invalid access token format");
  }
  try {
    const decoded = authService.verify(token.split(" ")[1]);
    req.user = decoded.user;

    next();
  } catch (err) {
    throw new errorStatus(err, 401);
  }
}
