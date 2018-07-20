var app = require("express").createServer();

app.get("/", function(req, res) {
  res.sendFile(`${process.cwd()}/static/linkedin.html`);
});

app.listen(8000);
