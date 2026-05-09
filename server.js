require("dotenv").config();

const app = require("./src/app");
const { connectDB } = require("./src/config/database");
const { syncModels } = require("./src/models");
const adminSeeder = require("./src/seeders/adminSeeder");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await syncModels();

    await adminSeeder();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
