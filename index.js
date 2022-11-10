const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logError, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('Hi, runing server express!');
});

routerApi(app);
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listen port: ' + port);
});
