var router = require('express').Router();
var UserDAO = require('../DAO/UserDAO');


router.get('/', async function(req, res, next) {
  let users = await new UserDAO().list();
  res.json(users);
  next();
})

router.get('/:id', async function(req, res, next) {
  let id = req.params.user_id;
  let user = await new UserDAO().get(user_id);
  res.json(user);
  next();
})

router.post('/', async function(req, res, next) {
  let user = { ...req.body }
  let insertedUser = await new UserDAO().insert(user)
  res.json(insertedUser);
  next();
})

router.put('/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = {id, ...req.body};
  await new UserDAO().modify(user);
  res.sendStatus(200);
  next();
})

router.delete('/:id',async function(req, res, next) {
  let id = req.params.id;
  let user = await new UserDAO().delete(id);
  res.sendStatus(200);
  next();
})

module.exports = router;