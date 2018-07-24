var request = require("request");
const config = require("../../config");
const logger = require("../logger")("csv");
const util = require("util");
const fs = require("fs");
var _ = require("lodash");

function getCompanies(domains, key) {
  var data = {};
  logger.info("getCompanies");
  const options = {
    uri: "https://api.linkedin.com/v2/organizations",
    method: "GET"
  };

  return new Promise(function(resolve, reject) {
    logger.info("before _each");

    logger.info("before send Domain, in loop domain = " + domains);
    sendDomains(domains, key).then(function(result) {
      logger.info("sendDomain returns");
      data[domain] = result;
    });

    resolve(data);
  });
}

function sendDomains(data, key, options) {
  logger.info("sendDomain");
  return new Promise(function(resolve, reject) {
    logger.info("before request");

    request(options, function(err, res, body) {
      if (!err) {
        logger.info("request response = " + body);
        resolve(JSON.parse(body));
      }
      logger.info("request response = " + body);
    });
  });
}

function writeCSV(data) {
  const dest = `${process.cwd()}/output${Date.now()}.csv`;
  var new_data = [];
  _each(data, function(key, value) {
    new_data.push(key, value);
  });
  stringify(new_data, function(err, output) {
    fs.writeFile(dest, output, "utf8", function(err) {
      if (err) {
        console.log(
          "Some error occured - file either not saved or corrupted file saved."
        );
      } else {
        console.log("It's saved!");
      }
    });
  });
  return dest;
}

module.exports = {
  getCompanies: getCompanies,
  writeCSV: writeCSV,
  sendDomains: sendDomains
};
