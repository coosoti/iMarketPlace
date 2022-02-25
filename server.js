import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './routes/index';

const mongoose = require('mongoose');

const swaggerJsDocs = YAML.load('./docs.yaml');

const uri = 'mongodb://localhost/icampusdb';
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(uri)
  .then(() => console.log('DB Connection Successfull'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
