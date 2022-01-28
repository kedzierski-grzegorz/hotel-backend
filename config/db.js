require("@config/app.config")();
const { Pool, Client } = require("pg");

const dbQueryError = "Query processing error";
const dbQueryErrCode = 400;
const dbInternalError = "Database internal error";
const dbInternalErrCode = 500;
const dbUnknownError = "Database unknown error";
const dbUnknownErrCode = 500;

const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const dbPool = {
  poolInstance: pool,
  dbQueryError: dbQueryError,
  dbQueryErrCode: dbQueryErrCode,
  dbInternalError: dbInternalError,
  dbInternalErrCode: dbInternalErrCode,
  dbUnknownError: dbUnknownError,
  dbUnknownErrCode: dbUnknownErrCode,
};

function _dbError(err) {
  return {
    statusCode: dbPool.dbInternalErrCode,
    statusInfo: dbPool.dbInternalError,
    statusDetail: err,
  };
}

function _queryError(err) {
  return {
    statusCode: dbPool.dbQueryErrCode,
    statusInfo: dbPool.dbQueryError,
    statusDetail: err,
  };
}

const db = {
  client() {
    return dbPool.poolInstance.connect();
  },

  /**
   * Begin a transaction using `client`.
   *
   * @param {Client} client
   */
  begin(client) {
    try {
      return client.query("BEGIN");
    } catch (err) {
      client.release();
      throw err;
    }
  },

  /**
   * Commit a transaction by `client`.
   *
   * @param {Client} client
   * @param {boolean} release
   */
  async commit(client, release = true) {
    try {
      const result = await client.query("COMMIT");
      if (release) {
        client.release();
      }
      return result;
    } catch (err) {
      PoolClient.client.release();
      throw err;
    }
  },

  /**
   * Roll back a transaction by `client`.
   *
   * @param {Client} client
   * @param {boolean} release
   */
  async rollback(client, release = true) {
    try {
      const result = await client.query("ROLLBACK");
      if (release) {
        client.release();
      }
      return result;
    } catch (err) {
      client.release();
      throw err;
    }
  },

  async execute(query, params, client) {
    if (client) {
      try {
        return await client.query(query, params);
      } catch (err) {
        throw _queryError(err);
      }
    }

    try {
      const client = await dbPool.poolInstance.connect();
      try {
        const queryRes = await client.query(query, params);
        client.release();
        return queryRes;
      } catch (err) {
        client.release();
        throw _queryError(err);
      }
    } catch (err) {
      throw _dbError(err);
    }
  },

  async executeTransaction(queries, _params) {
    return new Promise((resolve, reject) => {
      dbPool.poolInstance
        .connect()
        .then(async (client) => {
          try {
            await client.query("BEGIN");
            var results = [];
            await queries.forEach(async (q, i) => {
              const result = await client.query(q.query, q.params);
              results.push(result.rows);
            });
            await client.query("COMMIT");
            client.release();
            return resolve(results);
          } catch (err) {
            await client.query("ROLLBACK");
            client.release();
            let errObj = {
              statusCode: dbPool.dbQueryErrCode,
              statusInfo: dbPool.dbQueryError,
              statusDetail: err,
            };
            return reject(errObj);
          }
        })
        .catch((err) => {
          let errObj = {
            statusCode: dbPool.dbInternalErrCode,
            statusInfo: dbPool.dbInternalError,
            statusDetail: err,
          };
          return reject(errObj);
        });
    });
  },

  async getSingle(query, params, client = null) {
    let result;
    if (client) {
      result = await client.query(query, params);
    } else {
      result = await this.execute(query, params);
    }
    return result.rows[0];
  },

  async get(query, params, client = null) {
    let result;
    if (client) {
      result = await client.query(query, params);
    } else {
      result = await this.execute(query, params);
    }
    return result.rows;
  },
};

module.exports = db;
