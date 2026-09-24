import { Request, Response } from "express";
import { SignUpInput, UserRole } from "../types/auth.types";
import { strToMd5, verifyEmailFormat } from "../helpers/helpers";
import db from "@/db/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      userRole = UserRole.Subscriber,
    }: SignUpInput = req.body;

    if (!userName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!verifyEmailFormat(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const isUserExists = await db
      .select({
        email: users.email,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    if (isUserExists && isUserExists.length > 0) {
      return res.status(400).json({
        message: "User already exists, please login",
      });
    }

    const insertedUser = await db.insert(users).values({
      userName,
      email,
      phoneNumber,
      password: strToMd5(password),
      firstName,
      lastName,
      userRole: userRole || UserRole.Subscriber,
    });

    if (!insertedUser) {
      return res.status(500).json({
        message: "Failed to create user",
      });
    }

    return res.status(201).json({
      message: "User created successufully",
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (!verifyEmailFormat(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userData = await db
      .select({
        id: users.id,
        password: users.password,
        phoneNumber: users.phoneNumber,
        firstName: users.firstName,
        lastName: users.lastName,
        userName: users.userName,
        userRole: users.userRole,
        isActive: users.isActive,
      })
      .from(users)
      .where(and(eq(users.email, email), eq(users.isActive, true)))
      .limit(1);

    if (!userData || userData.length <= 0) {
      return res
        .status(409)
        .json({ status: false, message: "Invalid credentials" });
    }

    if (userData[0].password !== strToMd5(password)) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    const tokenExpiry = 2 * 60 * 60;
    const payload = {
      userId: userData[0].id,
      userRole: userData[0].userRole,
    };
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET_KEY is not configured");
    }

    const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiry });

    return res.json({
      status: true,
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
