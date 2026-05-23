const { Product, Brand } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;

    let brands = req.body.brands;

    if (!brands) {
      return errorResponse(res, "Brands are required", 400);
    }

    brands = JSON.parse(brands);

    if (!Array.isArray(brands)) {
      return errorResponse(res, "Brands must be array", 400);
    }

    if (!req.files || req.files.length === 0) {
      return errorResponse(res, "Brand images are required", 400);
    }

    if (req.files.length !== brands.length) {
      return errorResponse(res, "Each brand must have one image", 400);
    }

    const product = await Product.create({
      sellerId: req.user.id,
      productName,
      productDescription,
    });

    const brandData = brands.map((brand, index) => ({
      productId: product.id,

      brandName: brand.brandName,

      detail: brand.detail,

      price: brand.price,

      image: req.files[index].filename,
    }));

    await Brand.bulkCreate(brandData);

    return successResponse(res, "Product Added Successfully", product, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        sellerId: req.user.id,
      },

      include: [
        {
          model: Brand,
        },
      ],

      limit,
      offset,

      order: [["id", "DESC"]],
    });

    return successResponse(res, "Products Fetched Successfully", {
      totalRecords: products.count,

      currentPage: page,

      totalPages: Math.ceil(products.count / limit),

      products: products.rows,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        sellerId: req.user.id,
      },

      include: [
        {
          model: Brand,
        },
      ],
    });

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // Delete Images

    for (const brand of product.Brands) {
      const imagePath = path.join(__dirname, "../uploads", brand.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete Brands

    await Brand.destroy({
      where: {
        productId: product.id,
      },
    });

    // Delete Product

    await Product.destroy({
      where: {
        id: product.id,
      },
    });

    return successResponse(res, "Product Deleted Successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const viewProductPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        sellerId: req.user.id,
      },

      include: [
        {
          model: Brand,
        },
      ],
    });

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // Create PDF

    const doc = new PDFDocument({
      margin: 50,
    });

    // File Name

    const fileName = `product-${product.id}.pdf`;

    // Response Headers

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    doc.pipe(res);

    // Title

    doc.fontSize(22).text("Product Details", {
      align: "center",
    });

    doc.moveDown();

    // Product Details

    doc.fontSize(16).text(`Product Name: ${product.productName}`);

    doc.moveDown(0.5);

    doc.fontSize(14).text(`Description: ${product.productDescription}`);

    doc.moveDown();

    // Brand Section

    doc.fontSize(18).text("Brands");

    doc.moveDown();

    let totalPrice = 0;

    for (const brand of product.Brands) {
      totalPrice += Number(brand.price);

      doc.fontSize(14).text(`Brand Name: ${brand.brandName}`);

      doc.fontSize(12).text(`Detail: ${brand.detail}`);

      doc.fontSize(12).text(`Price: ₹${brand.price}`);

      doc.moveDown(0.5);

      // Brand Image

      const imagePath = path.join(__dirname, "../uploads", brand.image);

      if (fs.existsSync(imagePath)) {
        doc.image(imagePath, {
          fit: [120, 120],
          align: "left",
        });
      }

      doc.moveDown();
      doc.moveDown();
    }

    // Total Price

    doc.fontSize(18).text(`Total Price: ₹${totalPrice}`, {
      align: "right",
    });

    doc.end();
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const sumBrandPrices = async (req, res) => {
  try {
    let totalPrice = 0;
    const productId = req.params.id;

    if (!productId) {
      return errorResponse(res, "Product ID is required", 400);
    }

    const product = await Product.findOne({
      where: {
        id: productId,
        sellerId: req.user.id,
      },

      include: [
        {
          model: Brand,
        },
      ],
    });

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    for (const brand of product.Brands) {
      totalPrice += Number(brand.price);
    }

    return successResponse(res, "Total Price Calculated Successfully", {
      totalPrice,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  viewProductPDF,
  sumBrandPrices,
};
