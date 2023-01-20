const express = require('express');
const ProductService = require('../../services/product.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 */
router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     description: Products by Id
 *     tags:
 *       - Products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the product
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 */
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

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     description: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       description: ProductNoId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductNoId"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
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

/**
 * @openapi
 * /api/v1/products/{id}:
 *   patch:
 *     description: Update a product
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductNoId"
 *     parameters:
 *       - name: id
 *         description: id of the product
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
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

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     description: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         description: id of the product
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       202:
 *         description: Acepted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.delete(id);
  response.status(202).json({
    message: 'deleted',
    data: result
  });
});

module.exports = router;
