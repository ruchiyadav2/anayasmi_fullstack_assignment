const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const RegisterUser = require('../models/registerUser'); // your register model

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await RegisterUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new RegisterUser({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword // store hashed confirm password if needed
    });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
