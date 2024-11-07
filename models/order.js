const mongoose = require('mongoose');

const orderstable = new mongoose.Schema({
  orderId: { type: String, required: true,unique: true,},
  userId: {type: String,required: true,},
  pizzaItems: [{pizzaId: { type: String,required: true},
    quantity: {type: Number,required: true,min: 1 },
    size: {type: String,enum: ['small', 'medium', 'large'],required: true}
  }],
  totalPrice: {type: Number,required: true},
  deliveryAddress: { type: String,required: true},
  status: { type: String,enum: ['pending', 'delivered'], default: 'pending'},
  createdAt: {type: Date,default: Date.now },
  updatedAt: {type: Date,default: Date.now }
});

module.exports = mongoose.model('order', orderstable);
