const mongoose = require("mongoose");
const { logger } = require("../helpers/logger");

const productScheme = new mongoose.Schema({
  productOwnerId: {
    type: String,
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productImageUrl: {
    type: String,
  },
});
module.exports = mongoose.model("product", productScheme);
