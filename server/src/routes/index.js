var router = require('express').Router();
var blogPostRouter = require('./BlogPostRouter');
var userRouter = require('./UserRouter');
var TransactionInfo = require('../core/TransactionInfo');

function errorHandler(err, req, res, next) {
  console.log('returning 500');
  res.status(500).send();
}

router.use(TransactionInfo.preMiddleware);

router.use('/blogposts', blogPostRouter);
router.use('/users', userRouter);

router.use(TransactionInfo.successMiddleware)
router.use(TransactionInfo.errorMiddleware);
router.use(errorHandler);

module.exports = router

