const User = require("../models/user.model");
const ROLES = require("../constants/roles");

const { hashPassword } = require("../helpers/bcrypt.helper");

const adminSeeder = async () => {
  try {
    const adminExists = await User.findOne({
      where: {
        email: "admin@gmail.com",
      },
    });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await hashPassword("Admin@123");

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      mobileNo: "9999999999",
      country: "India",
      state: "MP",
      skills: [],
      password: hashedPassword,
      role: ROLES.ADMIN,
    });

    console.log("Admin Created Successfully");
  } catch (error) {
    console.log("Admin Seeder Error:", error.message);
  }
};

module.exports = adminSeeder;
