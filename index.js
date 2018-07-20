var express = require("express");
var app = express();
const oauth = require("./routes/oauth");

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
  res.sendFile(`${process.cwd()}/static/linkedin.html`);
});

app.get("/oauth", oauth);

app.listen(8000);
