import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import notificationRouter from "./notification.router.js";
import abstractRouter from "./abstract.router.js";
import conferenceRouter from "./conference.router.js";

export default function routes(app) {
  app.use("/auth/", authRouter());
  app.use("/api/users", userRouter());
  app.use("/api/notifications", notificationRouter());
  app.use("/api/abstracts", abstractRouter());
  app.use("/api/conferences", conferenceRouter());
}
