import express from "express"
import { addpost, deletepost, getpost, getposts, updatepost, singlepost } from "../controllers/post.js"

const router = express.Router()


router.get("/post", getposts)
router.get("/blogs", getpost)
router.get("post/:idpost", singlepost)
router.post("/write", addpost)
router.delete("/:id", deletepost)
router.put("/:id", updatepost)

export default router