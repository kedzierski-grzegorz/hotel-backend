const PREFIX = "/api/v1";

module.exports = (app) => {
  app.use(PREFIX, require("./example.route"));
};
