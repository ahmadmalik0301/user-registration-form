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
};
