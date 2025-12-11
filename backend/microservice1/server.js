const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const programRoutes = require('./routes/programRoutes');//

const authRoutes = require('./routes/authRoutes'); // your login route
const registerRoutes = require('./routes/registerRoutes'); // <-- add this

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/programs', programRoutes);


app.use('/api/auth', authRoutes);        // login
app.use('/api/register', registerRoutes); // <-- register

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/medresearch')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch(err => console.log(err));

