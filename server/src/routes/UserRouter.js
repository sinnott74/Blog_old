var router = require('express').Router();
var UserDAO = require('../DAO/UserDAO');


router.get('/', async function(req, res, next) {
  let users = await new UserDAO().list();
  res.json(users);
  next();
})

router.get('/:user_id', async function(req, res, next) {
  let user_id = req.params.user_id;
  let user = await new UserDAO().get(user_id);
  res.json(user);
  next();
})

router.post('/', async function(req, res, next) {
  let user = { ...req.body }
  let user_id = await new UserDAO().insert(user)
  // let token = await Auth.login(req.body.username, req.body.password);
  res.json(user_id);
  next();
})

router.put('/:user_id', async function(req, res, next) {
  let user_id = req.params.user_id;
  let user = {user_id, ...req.body};
  await new UserDAO().modify(user);
  res.sendStatus(200);
  next();
})

router.delete('/:user_id',async function(req, res, next) {
  let user_id = req.params.user_id;
  let user = await new UserDAO().delete(user_id);
  res.sendStatus(200);
  next();
})

module.exports = router;