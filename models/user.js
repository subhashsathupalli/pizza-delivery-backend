const mongoose = require('mongoose');

const userTable = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('user', userTable);
