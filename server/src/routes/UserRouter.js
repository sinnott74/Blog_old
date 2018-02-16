const router = require('express').Router();
const User = require('../Entity').User;
const Credential = require('../Entity').Credential;
const ORM = require('../util/ORM/ORM');


router.get('/', async function(req, res, next) {
  let users = await new UserDAO().list();
  res.json(users);
  next();
})

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = await User.get(id);
  res.json(user);
  next();
})

router.post('/', async function(req, res, next) {
  let user = { ...req.body }
  let insertedUser = await User.create(user);
  res.json(insertedUser);
  next();
})

router.put('/:id', async function(req, res, next) {
  let user = { ...req.body }
  let modified = await User.modify(user)
  res.json(modified);
  next();
})

router.delete('/:id',async function(req, res, next) {
  let id = req.params.id;
  await User.delete(id);
  res.sendStatus(200);
  next();
})


module.exports = router;