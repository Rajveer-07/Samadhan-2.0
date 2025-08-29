// Day 11 Mini Task: Student CRUD API
// code.calmchase.com hackathon - Rajveer
// Ye wala task thoda bada tha but finally ho gaya!

const express = require('express');
const app = express();
const PORT = 3000;

// Ye middleware bahut important hai! Iske bina req.body undefined aayega.
// Ye aane wali request ko JSON format me parse karta hai.
app.use(express.json());

// Real database nahi hai to array se kaam chala rahe hain lol
let students = [
  { id: 1, name: 'Rahul Sharma', class: '12th' },
  { id: 2, name: 'Simran Singh', class: '11th' },
];

// --- CRUD Operations ---

// 1. READ (GET) - Saare students ki list bhejo
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// 2. CREATE (POST) - Ek naya student add karo
app.post('/students', (req, res) => {
  // Naye student ka data req.body se aaega
  const newStudent = {
    id: students.length + 1, // Abhi ke liye simple ID generation
    name: req.body.name,
    class: req.body.class,
  };
  students.push(newStudent);
  res.status(201).send('Student successfully add ho gaya!');
});

// 3. UPDATE (PUT) - ID ke basis par student ko update karo
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id); // URL se ID nikali, ye string me hoti hai
  const student = students.find(s => s.id === studentId);

  if (student) {
    student.name = req.body.name;
    student.class = req.body.class;
    res.status(200).send(`Student ID ${studentId} update ho gaya.`);
  } else {
    res.status(404).send('Student nahi mila is ID se!'); // Error message
  }
});

// 4. DELETE - ID ke basis par student ko delete karo
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const initialLength = students.length;
  students = students.filter(s => s.id !== studentId); // Jo ID match nahi hui, unko new array me daal do

  if (students.length < initialLength) {
    res.status(200).send(`Student ID ${studentId} delete ho gaya.`);
  } else {
    res.status(404).send('Student nahi mila is ID se!');
  }
});


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Is API ko test karne ke liye Thunder Client ya Postman use karna.');
});
