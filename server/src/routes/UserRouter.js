const router = require('express').Router();
const User = require('../Entity').User;

router.get('/', async function(req, res, next) {
  let users = await User.findAll();
  res.json(users);
})

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = await User.get(id);
  throw new Error();
  res.json(user);
})

router.post('/', async function(req, res, next) {
  let user = { ...req.body }
  let insertedUser = await User.create(user);
  res.json(insertedUser);
})

router.put('/:id', async function(req, res, next) {
  let user = { ...req.body }
  let modified = await User.modify(user)
  res.json(modified);
})

router.delete('/:id',async function(req, res, next) {
  let id = req.params.id;
  await User.delete(id);
  res.sendStatus(200);
})


module.exports = router;