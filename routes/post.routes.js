import { Router } from "express";

import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPost);
router.post("/", createPost);
router.put("/like/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
