const ExampleModel = require("@models/example.model");

module.exports = (exampleObj) => {
    return ExampleModel.create(exampleObj);
}