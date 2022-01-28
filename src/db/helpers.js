/** @format */

const camelCase = require("camelcase");

function camelCaseIfNeeded(object) {
  if (object instanceof Array) {
    return object.map((value) => {
      if (typeof value === "object") {
        value = camelCaseIfNeeded(value);
      }
      return value;
    });
  } else {
    var newObject = {};
    var value;
    for (var key in object) {
      value = object[key];
      if (
        (value !== null && value !== undefined && value.constructor === Object) ||
        value instanceof Array
      ) {
        value = camelCaseIfNeeded(value);
      }
      newObject[camelCase(key)] = value;
    }
    return newObject;
  }
}

module.exports.camelCaseIfNeeded = camelCaseIfNeeded;
