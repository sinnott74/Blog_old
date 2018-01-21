var router = require('express').Router();
var Date = require('../util/Date')
var BlogPostDAO = require('../DAO/BlogPostDAO');

var testBlogPosts = [
  {
    id: 1,
    title: "Hello World",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my first blog post",
    "date": new Date().toString()
  },
  {
    id: 2,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  }
  ,
  {
    id: 3,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  }
  ,
  {
    id: 4,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  }
  ,
  {
    id: 5,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  },
  {
    id: 6,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  },
  {
    id: 7,
    title: "Hello World Again",
    author: "Daniel Sinnott",
    "text": "Hello world, this is my 2nd blog post",
    "date": new Date().toString()
  }
]
router.use(function(req, res, next){
  console.log('Blogs requested');
  next();
})

router.get('/', async function(req, res, next) {
  let blogPostDAO = new BlogPostDAO();
  let blogPosts = await blogPostDAO.list();
  // res.json(blogPosts);

  res.json(testBlogPosts);
  next();
})

router.get('/:id', async function(req, res, next) {
  var id = req.params.id;
  let blogPostDAO = new BlogPostDAO();
  let blogPost = await blogPostDAO.get(id);
  // res.json(blogPost);

  for(var testBlogPost of testBlogPosts){
    console.log(testBlogPost.id);
    if(testBlogPost.id == id){
      console.log(testBlogPost);
      res.json(testBlogPost);
    }
  }
  next();
})

router.post('/', async function(req, res, next){
  let blogPostDAO = new BlogPostDAO();
  let id = await blogPostDAO.insert(req.body);
  res.status(200).send(id);
  next();
})

module.exports = router;