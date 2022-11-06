const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hi, runing server express!');
});

routerApi(app);

app.listen(port, () => {
  console.log('Listen port: ' + port);
});
