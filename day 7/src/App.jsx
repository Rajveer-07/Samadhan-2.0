import { useState } from 'react';
import './App.css'; // css file

function App() {
  // yahan maine counter ka state banaya hai, pehle 0 hai
  const [count, setCount] = useState(0);

  // aur yahan text input ka state banaya hai, pehle empty string hai
  const [inputText, setInputText] = useState('');

  // ye function counter ko badhane ke liye hai
  const handleCounter = () => {
    setCount(count + 1);
    // setCount(prevCount => prevCount + 1); // ye bhi ek tarika hai, sir ne bataya tha
  };

  // ye function input text ko update karne ke liye hai
  const handleInputChange = (event) => {
    // input ki value event.target.value se milti hai
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <h1>Mini Task Day 7</h1>
      
      {/* pehla task: Counter */}
      <div className="counter-card">
        <h2>Counter</h2>
        <p>You clicked the button {count} times.</p>
        <button onClick={handleCounter}>
          Click Me
        </button>
      </div>

      {/* dusra task: Live Text Preview */}
      <div className="text-preview-card">
        <h2>Live Text Preview</h2>
        <input 
          type="text" 
          placeholder="Type something here..."
          value={inputText} // input ki value state se aati hai
          onChange={handleInputChange} // change hone pe state update hogi
        />
        <p>Live Preview: <strong>{inputText}</strong></p>
      </div>

    </div>
  );
}

export default App;