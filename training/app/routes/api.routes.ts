import express from "express";
import welcomeRouteCallback from "./welcome";
import authRoutes from "./auth.routes"
import todoRoutes from "./todo.routes"

const router = express.Router();

router.get("/", welcomeRouteCallback);
router.use("/auth", authRoutes);
router.use("/todos", todoRoutes);

export default router;
