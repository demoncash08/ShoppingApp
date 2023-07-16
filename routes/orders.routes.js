const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/", ordersController.getOrders);
router.post("/", ordersController.addOrder);
router.get("/success", ordersController.getSucess);
router.get("/cancel", ordersController.getFail);

module.exports = router;
