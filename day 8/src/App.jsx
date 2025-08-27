import { useState } from 'react';
import './App.css';

function App() {
  // yahan tasks ki list banayi hai
  const [tasks, setTasks] = useState([]);
  // aur yahan new task ke liye input ka state
  const [newTask, setNewTask] = useState('');

  // jab input me type karenge to ye function chalega
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // jab 'Add' button click karenge to ye function chalega
  const handleAddTask = () => {
    if (newTask.trim() !== '') { // empty task na add ho, isliye check kiya hai
      setTasks([...tasks, newTask]); // existing tasks me naya task add kiya
      setNewTask(''); // input field ko empty kar diya
    }
  };
  
  // jab 'Delete' button click karenge to ye function chalega
  const handleDeleteTask = (index) => {
    // filter method se us index ko hata diya
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <div className="input-section">
        <input 
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={(e) => { // enter dabane pe bhi task add ho
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      
      {/* yahan pe tasks ko render kar rahe hai map se */}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}> {/* ye key prop sir ne bataya tha */}
            <span>{task}</span>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;