// Day 13 Backend: Notes App with MongoDB!
// Rajveer - code.calmcalmchase.com
// Database wala part thoda tough tha, but Mongoose ne aasan kar diya!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// Ye connection string MongoDB Atlas se milti hai.
// Isko .env file me rakhna chahiye, but abhi yahi daal di. 😅
const MONGO_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING";

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB se connect ho gaye! Party! 🎉'))
  .catch((err) => console.log('DB Connection me error aaya:', err));

// --- MONGOOSE SCHEMA AND MODEL ---
// Data ka structure kaisa hoga
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Model jo database se interact karega
const Note = mongoose.model('Note', noteSchema);


// --- CRUD API ROUTES ---
// Ab ye routes array se nahi, seedha database se baat karenge

// 1. GET all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }); // find() saare documents le aata hai
  res.json(notes);
});

// 2. CREATE a new note
app.post('/notes', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  await newNote.save(); // .save() se data DB me store ho jaata hai
  res.status(201).json(newNote);
});

// 3. DELETE a note
app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note delete ho gaya' });
});


app.listen(PORT, () => {
  console.log(`Server chalu on port ${PORT}`);
});