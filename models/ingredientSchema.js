const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredient:String,
  amount:Number,
  price:Number
});
const ingredientModel = mongoose.model("ingredients",ingredientSchema);
exports.ingredientModel = ingredientModel;
