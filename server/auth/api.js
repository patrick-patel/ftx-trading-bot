const Validator = require("validator");
const isEmpty = require("isempty");
module.exports = function validateAPIInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data["api_key"] = !isEmpty(data["api_key"]) ? data["api_key"] : "";
  data['secret'] = !isEmpty(data['secret']) ? data['secret'] : "";

// api_key checks
  if (Validator.isEmpty(data["api_key"])) {
    errors.api_key = "API Key field is required";
  }

// secret checks
  if (Validator.isEmpty(data['secret'])) {
    errors.secret = "Secret field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};