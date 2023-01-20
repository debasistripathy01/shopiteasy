const express = require("express");

const { getProductById, createProduct, getProductDetailsByID, } = require("../controllers/product.controll")

const productRoutes = express.Router();

productRoutes.get("/:Id", getProductById)

productRoutes.get("/create", createProduct);

// productRoutes.get("/", )

module.exports={productRoutes};