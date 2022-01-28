const dotenv = require("dotenv");

dotenv.config();

exports = module.exports = appConfig;

function appConfig() {
  if (!(this instanceof appConfig)) return new appConfig();

  // MAIN APP CONFIG
  global.LOG_LEVEL = process.env.LOG_LEVEL || "trace";
  global.EXPRESSPORT = Number(process.env.PORT) || 8001;
  global.REQUEST_TIMEOUT = Number(process.env.REQTIMEOUT) || 60000;
  global.RESTART_DELAY = Number(process.env.RESTART_DELAY) || 1000;

  global.WEBAPP_URL = process.env.WEBAPP_URL || "http://localhost:3000";
  global.API_URL = process.env.API_URL || "http://localhost:8001";

  // DATABASE
  global.DBHOST = process.env.DBHOST;
  global.DBPORT = Number(process.env.DBPORT);
  global.DBUSER = process.env.DBUSER;
  global.DBPASS = process.env.DBPASS;
  global.DBNAME = process.env.DBNAME;
}
