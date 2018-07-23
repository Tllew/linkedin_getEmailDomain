var request = require("request");
const config = require("../../config");
const logger = require("../logger")("oauth_methods");
const util = require("util");

function getAccessToken(code) {
  logger.info("IN OAUTH");
  var url = "https://www.linkedin.com/uas/oauth2/accessToken";
  var query_string =
    "?grant_type=authorization_code&redirect_uri=%s&code=%s&client_id=%s&client_secret=%s";
  query_string = util.format(
    query_string,
    config.redirect_url,
    code,
    config.client_id,
    config.client_secret
  );

  logger.info("queryString = " + query_string);
  var options = {
    url: url + query_string
  };
  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      if (!err) {
        console.log(body);
        resolve(JSON.parse(body).access_token);
      }
    });
  });
}

module.exports = {
  getAccessToken: getAccessToken
};
