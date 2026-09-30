import { Response } from "express";
import { AuthRequest } from "../types/express.types";
import { TaskStatus } from "../types/task.types";
import { UserRole } from "../types/auth.types";
import db from "@/db/db";
import { users } from "@/db/schema";
import { and, eq, SQL } from "drizzle-orm";

const userColumns = {
  id: users.id,
  userName: users.userName,
  email: users.email,
  phoneNumber: users.phoneNumber,
  firstName: users.firstName,
  lastName: users.lastName,
  userRole: users.userRole,
  isActive: users.isActive,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (req.userRole !== UserRole.Admin) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: You are not allowed to do this operation",
      });
    }

    const { userRole, isActive } = req.query;
    let whereClause: SQL[] = [];

    if (userRole !== undefined) {
      if (!Object.values(UserRole).includes(userRole as UserRole)) {
        return res.status(400).json({
          status: false,
          message: "User role is invalid",
        });
      }

      whereClause.push(eq(users.userRole, userRole as UserRole));
    }

    if (isActive !== undefined) {
      if (isActive !== "true" && isActive !== "false") {
        return res.status(400).json({
          status: false,
          message: "User status is invalid",
        });
      }
      whereClause.push(eq(users.isActive, isActive === "true"));
    }

    const allUsers = await db
      .select(userColumns)
      .from(users)
      .where(whereClause.length > 0 ? and(...whereClause) : undefined);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error during fetching all users: ", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParams = req.params.userId;
    const userId = Number(userIdParams);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        status: false,
        message: "User id is invalid",
      });
    }

    if (req.userRole !== UserRole.Admin && Number(req.userId) !== userId) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: Only admin can fetch other user's details",
      });
    }

    const [user] = await db
      .select(userColumns)
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error during fetching user: ", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParams = req.params.userId;
    const userId = Number(userIdParams);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        status: false,
        message: "User id is invalid",
      });
    }

    if (req.userRole !== UserRole.Admin && Number(req.userId) !== userId) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: Only admin can fetch other user's details",
      });
    }

    const [user] = await db
      .select(userColumns)
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error during fetching user: ", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
