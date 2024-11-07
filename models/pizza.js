const mongoose = require('mongoose');

const pizzaTable = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  sizes: {
    small: { type: Number, required: true },
    medium: { type: Number, required: true },
    large: { type: Number, required: true },
  },
  toppings: [{ type: String }],
  pizza_id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('pizza', pizzaTable);
