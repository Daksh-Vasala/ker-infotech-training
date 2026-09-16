import { Response } from "express";
import { AuthRequest } from "../types/express.types";
import { TaskStatus, TaskUpdate } from "../types/task.types";
import db from "@/db/db";
import { tasks, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const {
      title,
      description,
      status = TaskStatus.PENDING,
      userId,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    // Only admin can create a task for another user
    if (userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only admin can create tasks for other users",
      });
    }

    // Admin can create for another user or itself.
    // Subscriber can only create for itself.
    const userIdToUse = userId || req.userId;

    const [newTask] = await db
      .insert(tasks)
      .values({
        title,
        description,
        status,
        userId: Number(userIdToUse),
      })
      .returning();

    if (!newTask) {
      return res.status(500).json({
        message: "Failed to create task",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Error during task creation:", error);

    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: false,
        message: "Valid Task ID is required",
      });
    }

    const data = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        status: tasks.status,
        userId: tasks.userId,
        user: {
          id: users.id,
          userName: users.userName,
          email: users.email,
          phoneNumber: users.phoneNumber,
          firstName: users.firstName,
          lastName: users.lastName,
          userRole: users.userRole,
          isActive: users.isActive,
        },
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
      })
      .from(tasks)
      .innerJoin(users, eq(users.id, tasks.userId))
      .where(eq(tasks.id, Number(id)))
      .limit(1);

    if (data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    const task = data[0];

    // Subscriber can only access their own task.
    // Admin can access any task.
    if (req.userRole !== "admin" && task.user.id !== Number(req.userId)) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: You do not have access to this task",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error in fetching task:", error);

    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getAllTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { userId, status } = req.query;

    const userIdToUse = Number(userId ?? req.userId);

    if (Number.isNaN(userIdToUse)) {
      return res.status(400).json({
        status: false,
        message: "Invalid userId",
      });
    }

    const whereClause: any[] = [];

    // Subscriber cannot filter by another user's ID.
    if (userId && req.userRole !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Forbidden: Only admins can filter tasks by other users",
      });
    }

    /*
      Subscriber:
        → filter by their own userId

      Admin + userId:
        → filter by requested userId

      Admin without userId:
        → no userId filter → get all tasks
    */
    if (req.userRole !== "admin" || userId) {
      whereClause.push(eq(tasks.userId, userIdToUse));
    }

    if (
      status &&
      String(status).trim() !== "" &&
      String(status).trim() !== "null"
    ) {
      if (!Object.values(TaskStatus).includes(String(status) as TaskStatus)) {
        return res.status(400).json({
          status: false,
          message: "Invalid status value",
        });
      }

      whereClause.push(eq(tasks.status, String(status) as TaskStatus));
    }

    const allTasks = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        status: tasks.status,
        userId: tasks.userId,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        user: {
          id: users.id,
          userName: users.userName,
          email: users.email,
          phoneNumber: users.phoneNumber,
          firstName: users.firstName,
          lastName: users.lastName,
          userRole: users.userRole,
          isActive: users.isActive,
        },
      })
      .from(tasks)
      .innerJoin(users, eq(tasks.userId, users.id))
      .where(and(...whereClause));

    if (allTasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No tasks found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Tasks retrieved successfully",
      data: allTasks,
    });
  } catch (error) {
    console.error("Error in fetching all tasks:", error);

    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid Task ID is required",
      });
    }

    // Admin can update any task.
    // Subscriber can update only their own task.
    const hasOwnership = await checkTaskOwnership(
      Number(id),
      Number(req.userId),
      String(req.userRole),
    );

    if (!hasOwnership) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: You can only update your own tasks",
      });
    }

    const { title, description, status } = req.body;

    // Reject invalid status
    if (status && !Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const dataToUpdate: TaskUpdate = {};

    if (title !== undefined) {
      dataToUpdate.title = title;
    }

    if (description !== undefined) {
      dataToUpdate.description = description;
    }

    if (status !== undefined) {
      dataToUpdate.status = status;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        status: false,
        message: "No valid fields to update",
      });
    }

    dataToUpdate.updatedAt = new Date().toISOString().slice(0, 10);

    const [updatedTask] = await db
      .update(tasks)
      .set(dataToUpdate)
      .where(eq(tasks.id, Number(id)))
      .returning();

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error in updating task:", error);

    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid Task ID is required",
      });
    }

    // Admin can delete any task.
    // Subscriber can delete only their own task.
    const hasOwnership = await checkTaskOwnership(
      Number(id),
      Number(req.userId),
      String(req.userRole),
    );

    if (!hasOwnership) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: You can only delete your own tasks",
      });
    }

    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, Number(id)))
      .returning();

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error("Error in deleting task:", error);

    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const checkTaskOwnership = async (
  taskId: number,
  userId: number,
  userRole: string,
): Promise<boolean> => {
  // Admin has access to every task.
  if (userRole === "admin") {
    return true;
  }

  const task = await db
    .select({
      userId: tasks.userId,
    })
    .from(tasks)
    .where(eq(tasks.id, taskId))
    .limit(1);

  if (task.length === 0) {
    return false;
  }

  return task[0].userId === userId;
};
