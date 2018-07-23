var fs = require("fs");
var handlebars = require("handlebars");
const logger = require("../logger")("view");

function view(file, data) {
  const sourceLocation = process.cwd() + "/static/partials/" + file + ".hbs";
  const destLocation = process.cwd() + "/static/html/" + file + ".html";
  const template = handlebars.compile(
    fs.readFileSync(sourceLocation, "utf-8"),
    {
      strict: true
    }
  );
  logger.info(data);
  const result = template(data);
  logger.info(result);
  fs.writeFileSync(destLocation, result);
}

function send(file, res) {
  res.sendFile(`${process.cwd()}/static/html/` + file + ".html");
}

module.exports = {
  view: view,
  send: send
};
