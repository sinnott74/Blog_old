import { Router, Request, Response } from "express";
const router = Router();
import { Tag } from "../Entity";

router.get("/", async function(req: Request, res: Response) {
  const tags = await Tag.findAll();
  res.json(tags);
});

router.post("/", async function(req: Request, res: Response) {
  const tagData = { ...req.body };
  const tag = new Tag(tagData);
  await tag.save();
  res.json(tag);
});

export default router;
