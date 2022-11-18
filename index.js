const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes/v1');
const { logError, errorHandler, boomErrorHandler } = require('./src/middlewares/error.handler')

const { swaggerDocs: v1SwaggerDocs } = require('./src/routes/v1/swagger');

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
  v1SwaggerDocs(app, port);
});
