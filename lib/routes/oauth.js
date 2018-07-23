const express = require("express");
const router = express.Router();
const url = require("url");
const getToken = require("../services/oauth_methods.js");
const view = require("../services/view");

router.get("/", function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const code = query.code;
  var get_token = getToken.getAccessToken(code);
  get_token.then(function (data) {
    view.view("getCSV", { "key": data });
    // redirect to /take_list, somehow move access_token there too..
    view.send("getCSV", res);
  })

});

module.exports = router;
