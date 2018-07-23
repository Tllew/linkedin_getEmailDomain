const express = require("express");
const router = express.Router();
const url = require("url");
const csv = require("../services/csv.js");
const view = require("../services/view");

router.POST("/", function(req, res) {
  csvData = csv.getCompanies(req.body.domain, req.body.token);
  csvData.then(result => {
    csv;
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
