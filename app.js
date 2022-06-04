const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

app.use((req, res, next) => {
  const error = new Error("Path Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

mongoose
  .connect("mongodb://localhost:27017/apiDB")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
