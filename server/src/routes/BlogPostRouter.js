var router = require('express').Router();
var Date = require('../util/Date')
var BlogPostDAO = require('../DAO/BlogPostDAO');

const BlogPost = require('../Entity').BlogPost;

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

  let test = await BlogPost.getBlogPostDetails(id);
  res.json(blogPost);
  next();
})

router.post('/', async function(req, res, next){
  let blogpost = {...req.body};
  let insertedBlogpost = await BlogPost.create(blogpost);
  console.log(insertedBlogpost.toJSON());
  res.json(insertedBlogpost);
  next();
})

router.put('/:id', async function(req, res, next){
  let blogpost = {...req.body};
  let id = await BlogPost.modify(blogpost);
  res.status(200).send(id);
  next();
})

module.exports = router;