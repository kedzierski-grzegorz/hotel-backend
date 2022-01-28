/** @format */

require("@config/app.config")();

const helpers = require("./helpers");
const decamelize = require("decamelize");

function knex(host, port) {
  return require("knex")({
    client: "pg",
    connection: {
      host,
      user: DBUSER,
      password: DBPASS,
      database: DBNAME,
      port,
    },
    wrapIdentifier: (value, origImpl, _queryContext) => origImpl(decamelize(value)),
    postProcessResponse: (result, _queryContext) => {
      if (!result) {
        return;
      }

      if (Array.isArray(result)) {
        return result.map(helpers.camelCaseIfNeeded);
      }
      return helpers.camelCaseIfNeeded(result);
    },
    migrations: {
      tableName: "migrations",
    },
  });
}

const Knex = require("knex");
Knex.QueryBuilder.extend("getFirst", async function () {
  const result = await this;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
});

module.exports = {
  knex: knex(DBHOST, DBPORT),
};
