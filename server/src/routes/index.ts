import { Router } from "express";
const router = Router();
import blogPostRouter from "./BlogPostRouter";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";
import tagRouter from "./TagRouter";
import { middleware as ORMMiddleware } from "sinnott-orm-typed";
import errorResponseMapperMiddleware from "../middleware/errorResponseMapper";

router.use(ORMMiddleware);
router.use("/auth", authRouter);
router.use("/blogposts", blogPostRouter);
router.use("/users", userRouter);
router.use("/tags", tagRouter);
router.use(errorResponseMapperMiddleware);

export default router;
