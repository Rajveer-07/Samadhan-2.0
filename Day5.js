// Day 5 Mini Task: API returning student list in JSON
// code.calmchase.com hackathon - Rajveer
// Express.js is awesome yaar!

// pehle Express ko bulao
const express = require('express');
const app = express();
const PORT = 3000;

// ye kuch fake student data bana diya hai 😅
const students = [
  { id: 1, name: 'Priya', major: 'Computer Science' },
  { id: 2, name: 'Ankit', major: 'Electronics' },
  { id: 3, name: 'Sneha', major: 'Information Technology' }
];

// ab ek route banaya hai. Jab /students pe jaenge to ye chalega
app.get('/students', (req, res) => {
  // req = request, res = response. ye to yaad ho gaya ab.
  res.json(students); // Express me ye res.json naya hai, isse JSON send hota hai.
});

// server ko chalu karo
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Browser me http://localhost:3000/students pe jaake dekho, list aayegi!');
});

// isko run karne se pehle "npm init -y" aur "npm install express" karna pada tha lol.
// ho gaya! I think ye sahi hai.
