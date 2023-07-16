const stripe = require("stripe")(
  "sk_test_51MGN7KSFUVMylKxFu9sXNEaeM7MPTzrL0NfsizIYmULIR5bczFbtoDVoKrL7fWXwcraMnj7VMhFczs1Oux8uKMHU00kde3I8J6"
);

const Order = require("../models/order.model");
const User = require("../models/user.model");

const express = require("express");
const app = express();
app.use(express.static("public"));

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +Math.trunc(item.product.price.toFixed(2) * 100),
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/cancel`,
  });

  res.redirect(303, session.url);
}

function getSucess(req, res) {
  res.render("customer/orders/success");
}
function getFail(req, res) {
  res.render("customer/orders/cancel");
}
module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSucess: getSucess,
  getFail: getFail,
};
