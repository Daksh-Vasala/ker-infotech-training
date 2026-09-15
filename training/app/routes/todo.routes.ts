import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { addTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todo.controller";

const router = express.Router();

router.use(verifyToken);

router.post("/", addTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
