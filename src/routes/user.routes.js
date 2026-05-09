const express = require("express");
const router = express.Router();
const { createSeller, getSellers } = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/joi.middleware");
const { createSellerSchema } = require("../validations/user.validation");
const ROLES = require("../constants/roles");

router.post(
  "/create-seller",
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(createSellerSchema),
  createSeller,
);

router.get("/sellers", authenticate, authorizeRoles(ROLES.ADMIN), getSellers);

module.exports = router;
