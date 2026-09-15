import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasks.controller";

const router = express.Router();

router.use(verifyToken);

router.post("/", createTask);
router.get("/:id", getTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
