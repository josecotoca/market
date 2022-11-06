const express = require('express');
const ProductService = require('./../services/product.service')

const router = express.Router();
const service = new ProductService();

router.get('/', (request, response) => {
  const products = service.find();
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.json(
    { name: 'Product filter', price: 100 }
  );
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const product = service.findById(id);
  response.json(product);
});

router.post('/', (request, response) => {
  const body = request.body;
  const newProduct = service.create(body);
  response.status(201).json({
    message: 'created',
    data: newProduct
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const product = service.update(id, body);
  response.json({
    message: 'updated',
    data: product,
    id
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  const result = service.delete(id);
  response.json({
    message: 'deleted',
    result
  });
});

module.exports = router;
