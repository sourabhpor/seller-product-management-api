const { errorResponse } = require("../utils/responseHandler");

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, "Unauthorized Access", 403);
    }

    next();
  };
};

module.exports = authorizeRoles;
