const { knex } = require("@db/knex");

module.exports = {
    
  findAll: (trx = knex) => {
    return trx.select().from("example");
  },

  create: (exampleObj, trx = knex) => {
      return trx("example").insert(exampleObj).returning("*");
  },

}
