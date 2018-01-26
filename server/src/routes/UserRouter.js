var router = require('express').Router();
var UserDAO = require('../DAO/UserDAO');
var Auth = require('../core/Auth');

router.get('/', async function(req, res, next) {
  let users = await new UserDAO().list();
  res.json(users);
  next();
})

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = await new UserDAO().get(id);
  res.json(user);
  next();
})

router.post('/', async function(req, res, next) {
  let user = { ...req.body }
  let id = await new UserDAO().insert(user)
  let token = await Auth.login(req.body.username, req.body.password);
  res.json(token);
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