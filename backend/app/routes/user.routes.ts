import express from "express";
import * as userController from "@/app/controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(verifyToken);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

export default router;
