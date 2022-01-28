const express = require("express");
const router = express.Router();
const { wrap } = require("@helpers/function.helper");
const example = require("@controllers/example.controller");

const PREFIX = "/example";

/**
 *  @function POST /
 */
router.post(
  PREFIX,
  example.validators.create,
  wrap(example.create)
);

/**
 *  @function GET /
 */
router.get(
  PREFIX,
  wrap(example.index)
);

module.exports = router;
