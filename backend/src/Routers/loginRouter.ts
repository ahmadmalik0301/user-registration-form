import express, { Router, Request, Response, NextFunction } from "express";
import loginPost from "../controllers/login/loginPost.js";
const router: Router = express.Router();

router.post("/", loginPost);

export default router;
