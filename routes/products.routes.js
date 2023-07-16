const express = require("express");

const authController = require("../controllers/auth.controller");
const productsControllers = require("../controllers/products.controllers");

const router = express.Router();

router.get("/products", productsControllers.getAllProducts);

router.get("/products/:id", productsControllers.getproductDetails);

module.exports = router;
