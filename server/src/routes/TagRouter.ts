import { Router } from "express";
const router = Router();
import { Tag } from "../Entity";

router.get("/", async function(req, res) {
  const tags = await Tag.findAll();
  res.json(tags);
});

router.post("/", async function(req, res) {
  const tagData = { ...req.body };
  const tag = new Tag(tagData);
  await tag.save();
  res.json(tag);
});

export default router;
