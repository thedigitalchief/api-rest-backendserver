const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  district: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;