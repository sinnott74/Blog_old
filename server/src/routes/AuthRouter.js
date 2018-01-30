var router = require('express').Router();
var Auth = require('../core/Auth');
var UserDAO = require('../DAO/UserDAO');
var CredentialDAO = require('../DAO/CredentialDAO');


/**
 * Route to log a user in
 */
router.post('/login', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  let token = await Auth.login(username, password);
  res.json(token);
  next();
});

router.post('/signup', async function(req, res, next) {
  let userCredentials = { ...req.body }
  let user = await new UserDAO().insert(userCredentials);
  await new CredentialDAO().insert({user_id: user.user_id, password: userCredentials.password})
  let token = await Auth.login(userCredentials.username, userCredentials.password);
  res.json(token);
  next();
});

module.exports = router;