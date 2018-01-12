var router = require('express').Router();
var Date = require('../util/Date')

var blogPosts = [
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
]
router.use(function(req, res, next){
  console.log('Blogs requested');
  next();
})

router.get('/', function(req, res) {
  res.json(blogPosts);
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  for(var blogPost of blogPosts){
    console.log(blogPost.id);
    if(blogPost.id == id){
      console.log(blogPost);
      res.json(blogPost);
    }
  }
})

module.exports = router;