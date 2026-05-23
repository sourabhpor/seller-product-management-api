const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  deleteProduct,
  viewProductPDF,
  sumBrandPrices,
} = require("../controllers/product.controller");
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const upload = require("../middlewares/multer.middleware");
const ROLES = require("../constants/roles");

router.post(
  "/add",
  authenticate,
  authorizeRoles(ROLES.SELLER),
  upload.array("images"),
  addProduct,
);

router.get("/list", authenticate, authorizeRoles(ROLES.SELLER), getProducts);

router.get(
  "/brand-price/:id",
  authenticate,
  authorizeRoles(ROLES.SELLER),
  sumBrandPrices,
);

router.get(
  "/pdf/:id",
  authenticate,
  authorizeRoles(ROLES.SELLER),
  viewProductPDF,
);

router.delete(
  "/delete/:id",
  authenticate,
  authorizeRoles(ROLES.SELLER),
  deleteProduct,
);

module.exports = router;
