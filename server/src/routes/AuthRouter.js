var router = require("express").Router();
var Auth = require("../core/Auth");
const User = require("../Entity/User");
const Credential = require("../Entity/Credential");

/**
 * Route to log a user in
 */
router.post("/login", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  let token = await Auth.login(username, password);
  res.json(token);
});

// router.post("/signup", async function(req, res) {
//   let userCredentials = { ...req.body };
//   const user = new User(userCredentials);
//   await user.save();
//   const credential = new Credential({
//     user_id: user.id,
//     password: userCredentials.password
//   });
//   await credential.save();
//   let token = await Auth.login(
//     userCredentials.username,
//     userCredentials.password
//   );
//   res.json(token);
// });

module.exports = router;
