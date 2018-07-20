const express = require("express");
const router = express.Router();
// const Promise = require("promise");
// const logger = require("../logger")("ga");

router.post("/", function(req, res) {
  const code = req.body.code;
  return res.status(200).send("WOOO");
});

module.exports = router;
