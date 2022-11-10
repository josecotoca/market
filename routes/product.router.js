const express = require('express');
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.json(
    { title: 'Product filter', price: 100 }
  );
});

router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await service.findById(id);
    response.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
validatorHandler(createProductSchema,'body'),
async (request, response) => {
  const body = request.body;
  const newProduct = await service.create(body);
  response.status(201).json({
    message: 'created',
    data: newProduct
  });
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema,'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const product = await service.update(id, body);
      response.json({
        message: 'updated',
        data: product,
        id
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.delete(id);
  response.json({
    message: 'deleted',
    result
  });
});

module.exports = router;
