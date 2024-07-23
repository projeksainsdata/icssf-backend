import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import AbstractController from "../controllers/abstract.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { isOwner } from "../middlewares/auth.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new AbstractController();

  // get all abstracts
  router.get("/", authMiddleware, controller.getAbstracts);

  // create new abstract
  router.post("/", authMiddleware, controller.createAbstract);

  // update abstract by id
  router.put("/:id", [authMiddleware, isOwner], controller.updateAbstract);

  // get abstract user login
  router.get("/management", [authMiddleware], controller.getAbstractByUser);

  // get abstract by id
  router.get("/:id", authMiddleware, controller.getAbstractById);

  // delete abstract by id
  router.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.deleteAbstract
  );

  return router;
}
