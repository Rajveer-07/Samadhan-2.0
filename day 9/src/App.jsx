import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // students ki list store karne ke liye state
  const [students, setStudents] = useState([]);
  // loading state, jab tak data nahi aata
  const [loading, setLoading] = useState(true);
  // error state
  const [error, setError] = useState(null);

  // useEffect se backend se data fetch karenge
  useEffect(() => {
    // async function banaya hai
    const fetchStudents = async () => {
      try {
        // yahan fetch se api call kar rahe hai
        const response = await fetch('http://localhost:3000/students');
        // agar response ok nahi hai to error throw karo
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // response ko json me convert karo
        const data = await response.json();
        // state update karo
        setStudents(data);
      } catch (e) {
        // agar koi error aaya to
        setError(e.message);
      } finally {
        // data aa gaya to loading false kar do
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // [] empty dependency array, taki ye effect sirf ek baar chale

  if (loading) {
    return <div className="App">Loading students...</div>;
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Student Directory</h1>
      <div className="student-container">
        {/* map se students ki list dikha rahe hai */}
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>ID: {student.id}</p>
            <p>Course: {student.course}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;