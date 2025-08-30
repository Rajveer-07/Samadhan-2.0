// Day 12 Frontend: React To-Do App
// Rajveer

import React, { useState, useEffect } from 'react';
import './App.css'; // Thodi si styling ke liye

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // useEffect se data fetch kar rahe hain jab component load hoga
  // pehli baar useEffect ajeeb laga but ab aagaya samajh!
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []); // [] ka matlab hai ki bas ek baar chalao

  const handleAddTask = (e) => {
    e.preventDefault(); // form submit pe page refresh rokne ke liye
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]); // state me naya todo add kar diya
        setTask(''); // input box ko khali kar diya
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Naya task add karo..."
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
