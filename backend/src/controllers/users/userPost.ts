import { Request, Response, NextFunction } from "express";
import findUser from "../../utils/findUser.js";
import userSchema from "../../Validations/userSchema.js";

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
};
