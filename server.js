const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb://localhost/icampusdb";
const userRoute = require('./routes/users');

mongoose
  .connect(uri)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.log(err)
  });

app.use('/api/v1/users', userRoute);

app.listen(5000, () => {
  console.log("Starting express server");
});
