import express from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
export default function () {
  const router = express.Router();
  const controller = new UserController();

  // create new user by admin
  router.post("/", [authMiddleware, adminMiddleware], controller.createUser);

  // get all users
  router.get("/", [authMiddleware, adminMiddleware], controller.searchUser);

  // get user by id
  router.get("/:id", [authMiddleware, adminMiddleware], controller.getUserById);

  // update user by id
  router.put("/:id", [authMiddleware, adminMiddleware], controller.updateUser);

  // delete user by id
  router.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.deleteUser
  );

  // update user verification status
  router.put(
    "/verify/:id",
    [authMiddleware, adminMiddleware],
    controller.updateVerificationStatus
  );

  return router;
}
