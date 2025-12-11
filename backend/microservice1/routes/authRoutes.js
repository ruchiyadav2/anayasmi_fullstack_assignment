const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/registerUser');

// Register a new user (optional if you want a signup page)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If matched, return success (you can also generate JWT token here)
    res.json({ message: 'Login successful' },
      {token:'dummy-token-123'}
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
