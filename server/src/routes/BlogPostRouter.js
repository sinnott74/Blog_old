var router = require('express').Router();
var Date = require('../util/Date')
var BlogPostDAO = require('../DAO/BlogPostDAO');

router.get('/', async function(req, res, next) {
  let blogPostDAO = new BlogPostDAO();
  let blogPosts = await blogPostDAO.list();
  res.json(blogPosts);
  next();
})

router.get('/:blogpost_id', async function(req, res, next) {
  var blogpost_id = req.params.blogpost_id;
  let blogPostDAO = new BlogPostDAO();
  let blogPost = await blogPostDAO.get(blogpost_id);
  res.json(blogPost);
  next();
})

router.post('/', async function(req, res, next){
  let blogpost = {...req.body};
  let blogPostDAO = new BlogPostDAO();
  let blogpost_id = await blogPostDAO.insert(blogpost);
  res.status(200).send(blogpost_id);
  next();
})

router.put('/:blogpost_id', async function(req, res, next){
  let blogpost = {...req.body};
  let blogPostDAO = new BlogPostDAO();
  let blogpost_id = await blogPostDAO.modify(blogpost);
  res.status(200).send(blogpost_id);
  next();
})

module.exports = router;