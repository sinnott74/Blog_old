import { Router } from "express";
const router = Router();
import blogPostRouter from "./BlogPostRouter";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";
import tagRouter from "./TagRouter";
import { init as ORMInit } from "sinnott-orm-typed";
import databaseConfig from "../config/databaseConfig";
import errorResponseMapperMiddleware from "../middleware/errorResponseMapper";

router.use(ORMInit(databaseConfig));
router.use("/auth", authRouter);
router.use("/blogposts", blogPostRouter);
router.use("/users", userRouter);
router.use("/tags", tagRouter);
router.use(errorResponseMapperMiddleware);

export default router;
