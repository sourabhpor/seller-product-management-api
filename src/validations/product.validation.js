const Joi = require("joi");

const addProductSchema = Joi.object({
  productName: Joi.string().required(),

  productDescription: Joi.string().required(),

  brands: Joi.array()
    .items(
      Joi.object({
        brandName: Joi.string().required(),

        detail: Joi.string().required(),

        price: Joi.number().required(),
      }),
    )
    .min(1)
    .required(),
});

module.exports = {
  addProductSchema,
};
