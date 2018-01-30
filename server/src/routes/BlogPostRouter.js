var router = require('express').Router();
var Date = require('../util/Date')
var BlogPostDAO = require('../DAO/BlogPostDAO');

router.get('/', async function(req, res, next) {
  let blogPostDAO = new BlogPostDAO();
  let blogPosts = await blogPostDAO.list();
  res.json(blogPosts);
  next();
})

router.get('/:id', async function(req, res, next) {
  var id = req.params.id;
  let blogPostDAO = new BlogPostDAO();
  let blogPost = await blogPostDAO.get(id);
  res.json(blogPost);
  next();
})

router.post('/', async function(req, res, next){
  let blogpost = {...req.body};
  let blogPostDAO = new BlogPostDAO();
  let insertedBlogpost = await blogPostDAO.insert(blogpost);
  res.status(200).send(insertedBlogpost);
  next();
})

router.put('/:id', async function(req, res, next){
  let blogpost = {...req.body};
  let blogPostDAO = new BlogPostDAO();
  let id = await blogPostDAO.modify(blogpost);
  res.status(200).send(id);
  next();
})

module.exports = router;