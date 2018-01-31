var router = require('express').Router();
var Date = require('../util/Date')
var BlogPostDAO = require('../DAO/BlogPostDAO');
var UserDAO = require('../DAO/UserDAO');

router.get('/', async function(req, res, next) {
  let blogPosts = await new BlogPostDAO().listBlogPostDetails();
  blogPosts.forEach((blogPost) => {
    blogPost.date = new Date(blogPost.created_on).toString();
  })
  res.json(blogPosts);
  next();
})

router.get('/:id', async function(req, res, next) {
  var id = req.params.id;
  let blogPost = await new BlogPostDAO().getBlogPostDetails(id);
  blogPost.date = new Date(blogPost.created_on).toString();
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