// Day 14 Backend: Authentication API (Register/Login)
// Rajveer - code.calmchase.com
// Ye wala topic super important and interesting hai! 🛡️

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password hash karne ke liye
const jwt = require('jsonwebtoken'); // Token banane ke liye

const app = express();
const PORT = 5000;
app.use(express.json());

// --- DATABASE CONNECTION ---
// MongoDB Atlas connection string yaha daalni hai
const MONGO_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING"; 
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));


// --- USER SCHEMA AND MODEL ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);


// JWT Secret Key - Isko hamesha .env file me rakhna chahiye!
const JWT_SECRET = 'this-is-a-super-secret-key-for-my-hackathon-project-123';


// --- API ROUTES ---

// 1. Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Password ko hash karna hai, bcrypt ne ye aasan kar diya
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).send('User register ho gaya! Ab login kar sakte ho.');
  } catch (error) {
    res.status(400).send('Error in registration. Username already exists?');
  }
});


// 2. Login an existing user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Galat username ya password!');
    }
    
    // Password compare karna - ye part cool hai!
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Galat username ya password!');
    }
    
    // Sab sahi hai, to token banake bhej do
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login successful!', token: token });
  } catch (error) {
    res.status(500).send('Server me error aa gaya');
  }
});


app.listen(PORT, () => {
  console.log(`Server chalu on port ${PORT}`);
});