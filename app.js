const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const bookRoutes = require("./api/routes/books");
const authorRoutes = require("./api/routes/authors");
const librarianRoutes = require("./api/routes/librarians");
const readerRoutes = require("./api/routes/readers");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb://admin:admin@cluster1-shard-00-00-q8mhm.mongodb.net:27017,cluster1-shard-00-01-q8mhm.mongodb.net:27017,cluster1-shard-00-02-q8mhm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin",
  {
    useMongoClient: true
  }
);

mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/librarians", librarianRoutes);
app.use("/readers", readerRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
