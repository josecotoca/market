const validate = require('joi');
const id = validate.string().uuid();
const title = validate.string().min(3).max(15);
const price = validate.number().integer().min(10);
const image = validate.string().uri();

const createProductSchema = validate.object({
  title: title.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = validate.object({
  title: title,
  price: price,
  image: image
});


const getProductSchema = validate.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
