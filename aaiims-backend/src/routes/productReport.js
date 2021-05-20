var express = require("express");
var router = express.Router();

const {
  getAllProductReports,
  createProductReport,
  deleteProductReport,
  getAllProductReportsMobile,
} = require("../controllers/report");

router.get("/:productId", getAllProductReports);
router.get("/mobile/:productId", getAllProductReportsMobile);
router.post("/", createProductReport);
router.delete("/:productReportId", deleteProductReport);

module.exports = router;
