const router = require("express").Router();
const User = require("../Entity").User;

router.get("/", async function(req, res) {
  let users = await User.findAll();
  res.json(users);
});

router.get("/:id", async function(req, res) {
  let id = req.params.id;
  let user = await User.get(id);
  res.json(user);
});

// router.post("/", async function(req, res) {
//   const userData = { ...req.body };
//   const user = new User(userData);
//   await user.save();
//   res.json(user);
// });

// router.put("/:id", async function(req, res) {
//   const userData = { ...req.body };
//   const user = new User(userData);
//   await user.save();
//   res.json(user);
// });

// router.delete("/:id", async function(req, res) {
//   let id = req.params.id;
//   await User.delete(id);
//   res.sendStatus(200);
// });

module.exports = router;
