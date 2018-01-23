var router = require('express').Router();
var Auth = require('../core/Auth');

/**
 * Route to log a user in
 */
router.post('/login', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  let token = await Auth.login(username, password);
  res.json(token);
  next();
})

module.exports = router;