/** @format */

module.exports.DatabaseQueryError = class extends Error {
  constructor(message) {
    super(`Database query failed: ${message}`);
    this.name = "DatabaseQueryError";
  }
};
