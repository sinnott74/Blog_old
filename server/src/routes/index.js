var router = require("express").Router();
var blogPostRouter = require("./BlogPostRouter");
var userRouter = require("./UserRouter");
var authRouter = require("./AuthRouter");
const errorResponseMapperMiddleware = require("../middleware/errorResponseMapper");

router.use("/auth", authRouter);
router.use("/blogposts", blogPostRouter);
router.use("/users", userRouter);
router.use(errorResponseMapperMiddleware);

module.exports = router;
