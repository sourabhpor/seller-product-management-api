const User = require("../models/user.model");
const { comparePassword } = require("../helpers/bcrypt.helper");
const { generateToken } = require("../helpers/jwt.helper");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return successResponse(
      res,
      "Login Successful",
      {
        token,
        role: user.role,
      },
      200,
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  login,
};
