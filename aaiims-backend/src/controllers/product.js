const productModel = require("../models/product");

exports.getProducts = async (req, res, next) => {
  const userId = req.userPayloadId;

  try {
    const products = await productModel.find({}).exec();
    if (products == null) {
      res.status(400).json({ error: "No Products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const pid = req.params.pid;

  try {
    const products = await productModel.findOne({ _id: pid }).exec();
    if (products == null) {
      res.status(400).json({ error: "No Products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
exports.createProduct = async (req, res, next) => {
  const userId = req.userPayloadId;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productImageUrl = req.body.productImageUrl;

  const product = new productModel({
    productOwnerId: userId,
    productName: productName,
    productDescription: productDescription,
    productImageUrl: productImageUrl,
  });
  try {
    const saveData = await product.save();
    if (!saveData) {
      return res.status(400).json({
        msg: "Error: Something went wrong, Product not created",
      });
    }
    return res.status(200).json({
      msg: "Product created.",
      _id: saveData._id,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error: Something went wrong",
    });
  }
};

exports.updateProduct = (req, res) => {
  const userId = req.userPayloadId;
  const productId = req.params.productId;
  console.log("productId", productId);

  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propertyName] = ops.value;
  }

  console.log("updateOps", updateOps);
  productModel
    .update({ _id: productId }, { $set: updateOps })
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.deleteProduct = async (req, res) => {
  const userId = req.userPayloadId;
  const productId = req.params.productId;
  console.log("productId", productId);
  productModel
    .deleteOne({ _id: productId })
    .then((data) => {
      console.log("data", data);
      if (data.deletedCount >= 1) {
        return res.status(200).json({ msg: "Product Deleted" });
      } else {
        return res.status(400).json({ msg: "Product Not Deleted" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Product Not Deleted" });
    });
};

exports.searchProduct = async (req, res) => {
  try {
    const products = await productModel.find({
      productName: "d",
    });

    console.log("products", products);
    if (products == null) {
      return res.status(400).json({ msg: "No products found" });
    }
    return res.status(400).json(products);
  } catch (error) {}
};
exports.getAllProductsCount = (req, res) => {
  productModel
    .countDocuments()
    .exec()
    .then((count) => {
      console.log("All Products count", count);
      res.status(200).json({ count: count });
    })
    .catch((err) => {
      console.log("Error: All Vendor Error", err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getProductImage = async (req, res, next) => {
  const pid = req.params.pid;

  try {
    const products = await productModel.findOne({ _id: pid }).exec();
    if (products == null) {
      res.status(400).json({ error: "No Products found" });
    }
    res
      .status(200)
      .json({
        productImageUrl: products.productImageUrl,
        productName: products.productName,
      });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
