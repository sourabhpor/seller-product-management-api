const Joi = require("joi");

const createSellerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Valid email is required",
    "string.empty": "Email is required",
  }),

  mobileNo: Joi.string().length(10).required().messages({
    "string.length": "Mobile number must be 10 digits",
  }),

  country: Joi.string().required().messages({
    "string.empty": "Country is required",
  }),

  state: Joi.string().required().messages({
    "string.empty": "State is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimum length is 6",
  }),

  skills: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Skills must be array",
  }),
});

module.exports = {
  createSellerSchema,
};
