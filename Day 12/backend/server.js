// Day 12 Backend: To-Do API
// Rajveer - code.calmchase.com

const express = require('express');
const cors = require('cors'); // CORS ko import karna zaroori hai
const app = express();
const PORT = 5000; // Backend alag port pe chalega

// Middleware
app.use(cors()); // CORS error se bachne ke liye
app.use(express.json()); // JSON data samajhne ke liye

// In-memory database (array se kaam chala rahe hain)
let todos = [
  { id: 1, task: 'Hackathon Day 12 complete karna hai' },
  { id: 2, task: 'React aache se seekhna hai' },
];

// ROUTES
// 1. GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// 2. POST (add) a new todo
app.post('/todos', (req, res) => {
  const newTask = {
    id: Date.now(), // Unique ID ke liye timestamp use kar liya lol
    task: req.body.task,
  };
  todos.push(newTask);
  res.status(201).json(newTask);
});

// 3. DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.status(200).send({ message: 'Todo delete ho gaya' });
});

app.listen(PORT, () => {
  console.log(`Backend server http://localhost:${PORT} pe chalu ho gaya`);
});