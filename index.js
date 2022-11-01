const express = require('express');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hi, runing server express!');
})

app.listen(port, () => {
  console.log('Listen port: ' + port)
})

