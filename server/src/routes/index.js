const router = require("express").Router();
const blogPostRouter = require("./BlogPostRouter");
const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");
const tagRouter = require("./TagRouter");
const ORM = require("sinnott-orm");
const databaseConfig = require("../config/databaseConfig");
const errorResponseMapperMiddleware = require("../middleware/errorResponseMapper");

router.use(ORM.init(databaseConfig));
router.use("/auth", authRouter);
router.use("/blogposts", blogPostRouter);
router.use("/users", userRouter);
router.use("/tags", tagRouter);
router.use(errorResponseMapperMiddleware);

module.exports = router;
