import express from "express";
import loginPost from "../controllers/login/loginPost.js";
const router = express.Router();
router.post("/", loginPost);
export default router;
