/** @format */

require("./config/app.config")();
var path = require("path");

module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: DBHOST,
      database: DBNAME,
      user: DBUSER,
      password: DBPASS,
      port: DBPORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      disableMigrationsListValidation: true,
    },
    directory: path.resolve(__dirname, "migrations"),
  },

  onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
