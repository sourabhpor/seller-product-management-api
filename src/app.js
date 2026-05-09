const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

module.exports = app;
