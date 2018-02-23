var router = require('express').Router();
const BlogPost = require('../Entity').BlogPost;

router.get('/', async function(req, res, next) {
  const blogPosts = await BlogPost.listBlogPostDetails();
  res.json(blogPosts);
})

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  const blogPost = await BlogPost.getBlogPostDetails(id);
  res.json(blogPost);
})

router.post('/', async function(req, res, next){
  const blogpostData = {...req.body};
  const blogPost = new BlogPost(blogpostData);
  const insertedBlogpost = await BlogPost.create(blogpostData);
  res.json(insertedBlogpost);
})

router.put('/:id', async function(req, res, next){
  const blogpost = {...req.body};
  const id = await BlogPost.modify(blogpost);
  res.status(200).send(id);
})

module.exports = router;