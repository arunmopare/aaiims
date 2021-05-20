var express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProducts,
  getAllProductsCount,
  getSingleProduct,
  getProductImage,
} = require("../controllers/product");
var router = express.Router();

// CREATE PRODUCT
// Body
// {
//     "productName":"Grain",
//     "productQuantity":"20",
//     "productDescription":"good grain",
//     "productImageUrl":"http://google.com"
// }
router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.post("/search", searchProduct);
router.get("/count", getAllProductsCount);
router.get("/image/:pid", getProductImage);
router.get("/:pid", getSingleProduct);

module.exports = router;
