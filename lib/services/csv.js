var request = require("request");
const config = require("../../config");
const logger = require("../logger")("csv");
const util = require("util");
const fs = require("fs");

function getCompanies(domains, key) {
  data = {};
  return new Promise(function(resolve, reject) {
    _.each(domains, domain => {
      sendDomains(domain, key).then(function(result) {
        data[domain] = result;
      });
    });
    resolve(data);
  });
}

function sendDomains(data, key) {
  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      if (!err) {
        console.log(body);
        resolve(JSON.parse(body));
      }
    });
  });
}

function writeCSV(data) {
  var new_data = [];
  _each(data, function(key, value) {
    new_data.push(key, value);
  });
  stringify(new_data, function(err, output) {
    fs.writeFile("name.csv", output, "utf8", function(err) {
      if (err) {
        console.log(
          "Some error occured - file either not saved or corrupted file saved."
        );
      } else {
        console.log("It's saved!");
      }
    });
  });
}

module.exports = {
  getAccessToken: getAccessToken
};
