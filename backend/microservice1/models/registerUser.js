const mongoose = require('mongoose');

const RegisterUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }  // Added this
});

module.exports = mongoose.model('RegisterUser', RegisterUserSchema);
