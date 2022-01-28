/** @format */

require("module-alias/register");
require("@config/app.config")();

const express = require("express"),
  helmet = require("helmet"),
  bodyParser = require("body-parser"),
  http = require("http"),
  path = require("path");

const errorHandler = require("@middleware/error-handler.middleware");
const appendRoutes = require("@routes");
const sockets = require("@listeners/socket.listener");

var app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

app.use("/", express.static(path.join(__dirname, "view")));

app.use(function (req, res, next) {
  console.log('logger', req.method, req.path, req.body)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Authorization"
  );
  res.setTimeout(REQUEST_TIMEOUT, function () {
    console.error("ERROR: Freeze on request timeout, restarting...");
    setTimeout(() => {
      process.exit(1);
    }, RESTART_DELAY);
  });
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const httpserver = http.createServer(app);
sockets(httpserver);

const db = require("@config/db");
app.set("db", db);

appendRoutes(app);

app.use(errorHandler);

httpserver.listen(EXPRESSPORT, function () {
  console.log("App listening on: %s", EXPRESSPORT);
});
