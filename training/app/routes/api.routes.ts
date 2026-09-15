import express from "express";
import welcomeRouteCallback from "./welcome";
import authRoutes from "./auth.routes"
import tasksRoutes from "./tasks.routes"

const router = express.Router();

router.get("/", welcomeRouteCallback);
router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);

export default router;
