import db from "@/db/db";
import { AuthRequest } from "../types/express.types";
import { todoInput } from "../types/todo.types";
import { Response } from "express";
import { todos, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const addTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description }: todoInput = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const userId = Number(req.userId);

    if (!req.userId || !Number.isInteger(userId)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const insertedTodo = await db.insert(todos).values({
      title,
      description,
      userId,
    });

    return res.status(201).json({
      message: "Todo created successfully",
      data: insertedTodo.rows[0],
    });
  } catch (error) {
    console.error("Error during creating todo:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.userId);

    if (!req.userId || !Number.isInteger(userId)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const isUserExists = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!isUserExists.length) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (userId !== isUserExists[0].id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const allTodos = await db
      .select({
        id: todos.id,
        title: todos.title,
        description: todos.description,
        userId: todos.userId,
      })
      .from(todos)
      .where(eq(todos.userId, userId));

    return res.status(200).json({
      message: "Todos fetched successfully",
      data: allTodos,
    });
  } catch (error) {
    console.error("Error during fetching todos:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getTodoById = async (req: AuthRequest, res: Response) => {
  try {
    const todoId = Number(req.params.id);
    const userId = Number(req.userId);

    if (!req.userId || !Number.isInteger(userId)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const isUserExists = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!isUserExists.length) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (userId !== isUserExists[0].id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const todo = await db
      .select({
        id: todos.id,
        title: todos.title,
        description: todos.description,
        userId: todos.userId,
      })
      .from(todos)
      .where(eq(todos.userId, userId));

    if (!todo || todo.length <= 0) {
      return res.status(400).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error during fetching todo:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todoId = Number(req.params.id);
    const { title, description } = req.body;
    const userId = Number(req.userId);

    if (!req.userId || !Number.isInteger(userId)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const isUserExists = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!isUserExists.length) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (userId !== isUserExists[0].id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await db
      .update(todos)
      .set({
        title,
        description,
      })
      .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));

      
    console.log(result)
    if (!result) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error during creating todo:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todoId = Number(req.params.id);
    const userId = Number(req.userId);

    if (!req.userId || !Number.isInteger(userId)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const isUserExists = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!isUserExists.length) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (userId !== isUserExists[0].id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await db
      .delete(todos)
      .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));

      
    console.log(result)
    if (!result) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      message: "Todo deletd successfully",
    });
  } catch (error) {
    console.error("Error during creating todo:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
