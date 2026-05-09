const User = require("../models/user.model");
const ROLES = require("../constants/roles");
const { hashPassword } = require("../helpers/bcrypt.helper");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const createSeller = async (req, res) => {
  try {
    const { name, email, mobileNo, country, state, skills, password } =
      req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(res, "Email already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const seller = await User.create({
      name,
      email,
      mobileNo,
      country,
      state,
      skills,
      password: hashedPassword,
      role: ROLES.SELLER,
    });

    return successResponse(res, "Seller Created Successfully", seller, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const sellers = await User.findAndCountAll({
      where: {
        role: ROLES.SELLER,
      },

      attributes: {
        exclude: ["password"],
      },

      limit,
      offset,

      order: [["id", "DESC"]],
    });

    return successResponse(res, "Seller List Fetched Successfully", {
      totalRecords: sellers.count,

      currentPage: page,

      totalPages: Math.ceil(sellers.count / limit),

      sellers: sellers.rows,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createSeller,
  getSellers,
};
