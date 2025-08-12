import express, { Router } from "express";
import userGet from "../controllers/users/userGet.js";
import userGetId from "../controllers/users/userGetId.js";
import userDelete from "../controllers/users/userDelete.js";
import userPost from "../controllers/users/userPost.js";
import userPut from "../controllers/users/userPut.js";

const router: Router = express.Router();

router.get("/", userGet);
router.get("/:id", userGetId);
router.post("/", userPost);
router.put("/:id", userPut);
router.delete("/:id", userDelete);

export default router;
