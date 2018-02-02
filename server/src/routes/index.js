var router = require('express').Router();
var blogPostRouter = require('./BlogPostRouter');
var userRouter = require('./UserRouter');
var authRouter = require('./AuthRouter');
var TransactionInfo = require('../core/TransactionInfo');
const errorResponseMapperMiddleware = require('../middleware/errorResponseMapper');

router.use(TransactionInfo.preMiddleware);

router.use('/auth', authRouter);
router.use('/blogposts', blogPostRouter);
router.use('/users', userRouter);

router.use(TransactionInfo.successMiddleware)
router.use(TransactionInfo.errorMiddleware);
router.use(errorResponseMapperMiddleware);

module.exports = router

