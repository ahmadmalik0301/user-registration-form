import express, { Router, Request, Response, NextFunction } from "express";
import userSchema from "../Validations/userSchema.js";
import findUser from "../utils/findUser.js";

import prisma from "../DB/DB.js";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  age: number | null;
  phone_number: string | null;
  country: string | null;
  address: string | null;
  id: number;
}
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await prisma.user.findMany({
      orderBy: [{ id: "asc" }],
    });

    if (users.length === 0) {
      return res.status(200).json({ message: "No user to display" });
    }

    res.status(200).json({
      message: "All users in ascending order",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.id);

    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value }: { error: any; value: Omit<User, "id"> } =
      userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user: User | null = await findUser(value.email);
    if (user)
      return res
        .status(409)
        .json({ message: "User with this email already exist" });
    const {
      first_name,
      last_name,
      age,
      phone_number,
      email,
      country,
      address,
    } = value;

    const newUser: User = await prisma.user.create({
      data: {
        first_name,
        last_name,
        age,
        phone_number,
        email,
        country,
        address,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value }: { error: any; value: Omit<User, "id"> } =
      userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const userId = Number(req.params.id);

    const existingUser: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEmail: string = value.email.trim().toLowerCase();
    const emailTaken = await prisma.user.findFirst({
      where: {
        email: newEmail,
        NOT: { id: userId },
      },
    });

    if (emailTaken)
      return res
        .status(409)
        .json({ message: "Another user with this email already exists" });

    const updatedUser: User = await prisma.user.update({
      where: { id: userId },
      data: {
        first_name: value.first_name,
        last_name: value.last_name,
        age: value.age,
        phone_number: value.phone_number,
        email: value.email,
        country: value.country,
        address: value.address,
      },
    });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
});
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const deletedUser: User = await prisma.user.delete({
        where: { id: userId },
      });

      return res.json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "No user with this ID exists" });
      }
      next(error);
    }
  }
);

export default router;
