var router = require('express').Router();
var blogRouter = require('./BlogRouter');

router.use('/blogposts', blogRouter);

module.exports = router