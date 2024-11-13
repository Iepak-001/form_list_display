const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb+srv://deeepak2002:Depak123@cluster0.xkhzt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('\n Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Route to add a new user
app.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User added', user });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://form-list-display.onrender.com`);
});
