import express from 'express';
const mongoose = require("mongoose");
import router from './routes/index';

const uri = "mongodb://localhost/icampusdb";
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(uri)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.log(err)
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
