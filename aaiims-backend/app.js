require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

// Rotes
const signInRoutes = require("./src/routes/auth.routes.js");

const { authLimiter } = require("./middleware/rateLimiter.js");

// Farmer Routes
const productRoutes = require("./src/routes/product.js");

const reportRoutes = require("./src/routes/productReport.js");
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB CONNECTION
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//sign in route

app.use("/api/auth", authLimiter, signInRoutes);

// Product Routes
app.use("/api/product", authLimiter, productRoutes);

// Report routes
app.use("/api/report", authLimiter, reportRoutes);

const port = 3000;
// app.get("/", (req, res) => res.send("From The Farmers app server..."));
app.listen(port, process.env.SERVERIP, () => {
  console.log(`app is running on ${process.env.SERVERIP}:${port}`);
});