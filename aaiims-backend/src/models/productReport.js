const mongoose = require("mongoose");
const { logger } = require("../helpers/logger");

const productReportScheme = new mongoose.Schema({
  productId: {
    type: String,
  },
  productName: {
    type: String,
  },
  report: {
    type: String,
  },
  maintenanceBy: {
    type: String,
  },
  date: {
    type: String,
  },
});
module.exports = mongoose.model("productReport", productReportScheme);
