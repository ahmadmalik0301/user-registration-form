import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import loginRouter from "./Routers/loginRouter.js";
import userRouter from "./Routers/userRouter.js";
import authenticateJWT from "./middleware/authenticateJWT.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use("/login", loginRouter);
app.use("/users", authenticateJWT, userRouter);
app.use((req, res, next) => {
    res.status(404).send({ message: "404- Page not Found" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: `Internal Server Error- ${err.message}` });
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
