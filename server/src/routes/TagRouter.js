const router = require("express").Router();
const Tag = require("../Entity").Tag;

router.get("/", async function(req, res) {
  const tags = await Tag.findAll();
  res.json(tags);
});

module.exports = router;
