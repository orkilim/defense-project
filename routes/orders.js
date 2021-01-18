const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders')


// get all orders 
router.get('/',(req, res) => {
  controller.getOrders(req,res);
});

//add an order 
router.post("/addOrder",(req, res) => {
  controller.addOrder(req, res);
})

//change order
router.put("/changeOrder",(req, res) => {
  controller.changeOrder(req, res);
})

//delete order
router.delete("/deleteOrder", (req,res) => {
  controller.deleteOrder(req, res);
})

module.exports = router;
