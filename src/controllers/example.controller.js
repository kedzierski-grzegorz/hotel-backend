const { validationResult, body } = require("express-validator");
const { ValidatorException } = require("@exceptions");

const { getExamples, createExample } = require("@services/example");

module.exports = {
  validators: {
      create: [
          body("name", 'Name must be a string of length 3 - 50 characters').isString().isLength({ min: 3, max: 50 })
      ],
      index: [],
  },

  /**
   * @api {post} /api/v1/example Creates an example
   * @apiName CreateExample
   * @apiGroup Example
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} name
   *
   * @apiSuccess (Success 200) {object} example
   */
  create: async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new ValidatorException(validationErrors);
    }

    const example = await createExample({ name: req.body.name });
    res.status(200).send(example);
  },

  /**
   * @api {post} /api/v1/example Gets all examples
   * @apiName ShowAllExamples
   * @apiGroup Example
   * @apiVersion 1.0.0
   *
   * @apiSuccess (Success 200) {object} example
   */
  index: async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new ValidatorException(validationErrors);
    }

    const examples = await getExamples();
    res.status(200).send(examples);
  },
};
