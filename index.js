const config = require("./config");
const express = require("express");
const app = express();
const oauth = require("./lib/routes/oauth");
const bodyParser = require("body-parser");
const getCompanyCode = require("./lib/routes/getCompanyCode");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/1/healthcheck", function(req, res) {
  logger.debug(req.query);
  db.validateConnection()
    .then(() => {
      res.send("200 OK");
    })
    .catch(err => {
      res.status(503).send("503");
    });
});

app.get("/", function(req, res) {
  res.sendFile(`${process.cwd()}/static/html/linkedin.html`);
});

app.use("/oauth", oauth);

app.use("/getCSV", function(req, res) {
  res.sendFile(`${process.cwd()}/static/html/getCSV.html`);
});

app.use("/css/stylesheet.css", function(req, res) {
  res.sendFile(`${process.cwd()}/static/css/stylesheet.css`);
});

app.use("/returnCSV", getCompanyCode);

app.listen(config.port);
