const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");

router.get("/profile", authenticate, async (req, res) => {
  const user = req.user.toJSON();
  delete user.password;
  res.json({
    success: true,
    user,
  });
});

module.exports = router;
