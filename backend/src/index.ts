import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import loginScheme from "./Validations/loginSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRouter from "./Routers/userRouter.js";

import authenticateJWT from "./middleware/authenticateJWT.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
interface login {
  email: string;
  password: string;
}
app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value }: { error: any; value: login } = loginScheme.validate(
      req.body
    );
    if (error) return res.status(400).json({ message: error.message });

    const { email, password }: login = value;

    if (email !== process.env.ADMIN_EMAIL!) {
      return res.status(401).json({ message: "Wrong Credidential" });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASS!);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Credidential" });
    }

    const token = jwt.sign({ email, role: "Admin" }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
});
app.use("/users", authenticateJWT, userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ message: "404- Page not Found" });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: `Internal Server Error- ${err.message}` });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
