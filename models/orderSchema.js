const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id:{type:Number,required:true},
  client:{type:String,required:true},
  pizzaType:{type:String,required:true},
  amount:{type:Number,default:1},
  price:{type:Number,default:10}
});
const orderModel = mongoose.model("orders",orderSchema);
exports.orderModel = orderModel;
