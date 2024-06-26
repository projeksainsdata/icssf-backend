import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";

export default function routes(app) {
  app.use("/api/", authRouter());
  app.use("/api/users", userRouter());
}
