import { Request, Response, NextFunction } from "express";

import prisma from "../../DB/DB.js";
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

export default async (req: Request, res: Response, next: NextFunction) => {
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
};
