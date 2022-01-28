const ExampleModel = require("@models/example.model");

module.exports = () => {
    return ExampleModel.findAll();
}