const faker = require('faker');
const boom = require('@hapi/boom');
class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 50;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.fashion(640, 480, true),
        isBlock: faker.datatype.boolean()
      });
    }
  }
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000)
    });
  }

  async findById(id) {
    const product = this.products.find(item => item.id === id);
    if(!product)
      throw boom.notFound('Product not found');

    if(product.isBlock)
      throw boom.conflict('Product is block');

    return product;
  }

  async  update(id, change) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound('Product not found');

    const old_product = this.products[index];
    this.products[index] = {
      ...old_product,
      ...change
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound('Product not found');

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
