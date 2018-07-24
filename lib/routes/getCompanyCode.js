const express = require("express");
const router = express.Router();
const url = require("url");
const csv = require("../services/csv.js");
const logger = require("../logger")("getCompanyCode");

router.get("/", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  logger.info(query.domain, query.token);
  csvData = csv.getCompanies(query.domain, query.token);
  csvData.then(result => {
    logger.info("companies = " + JSON.stringify(result));
    file = csv.writeCSV(result);
    var mimetype = mime.lookup(file);
    res.download(file);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=companyCodes.csv"
    );
    res.setHeader("Content-type", "csv");
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });
});

module.exports = router;
