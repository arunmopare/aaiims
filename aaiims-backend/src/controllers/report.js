const reportModel = require("../models/productReport.js");

exports.getAllProductReports = async (req, res, next) => {
  const productId = req.params.productId;
  console.log("productId", productId);

  try {
    const productReport = await reportModel
      .find({ productId: productId })
      .exec();
    console.log("productReport", productReport);
    if (productReport == null || productReport.length == 0) {
      return res.status(400).json({ error: "No Reports found" });
    }
    return res.status(200).json(productReport);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
exports.getAllProductReportsMobile = async (req, res, next) => {
  const productId = req.params.productId;
  console.log("productId", productId);

  try {
    const productReport = await reportModel
      .find({ productId: productId })
      .exec();
    console.log("productReport", productReport);
    if (productReport == null || productReport.length == 0) {
      return res.status(400).json({ error: "No Reports found" });
    }
    return res.status(200).json({ ...productReport });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

exports.createProductReport = async (req, res, next) => {
  let d = new Date();
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const today = `${da}-${mo} ${ye}`;
  console.log("today", today);

  const productId = req.body.productId;
  const productName = req.body.productName;
  const report = req.body.report;
  const maintenanceBy = req.body.maintenanceBy;

  const ProductReport = new reportModel({
    productId: productId,
    productName: productName,
    report: report,
    maintenanceBy: maintenanceBy,
    date: today,
  });
  try {
    const saveData = await ProductReport.save();
    if (!saveData) {
      return res.status(400).json({
        msg: "Error: Something went wrong, ProductReport not created",
      });
    }
    return res.status(200).json({
      msg: "ProductReport created.",
      _id: saveData._id,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error: Something went wrong",
    });
  }
};

exports.deleteProductReport = async (req, res) => {
  const productReportId = req.params.productReportId;
  reportModel
    .deleteOne({ _id: productReportId })
    .then((data) => {
      console.log("data", data);
      if (data.deletedCount >= 1) {
        return res.status(200).json({ msg: "Product Report Deleted" });
      } else {
        return res.status(400).json({ msg: "Product Report Not Deleted" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Product Report Not Deleted" });
    });
};
