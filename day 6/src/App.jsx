import React from 'react';
import ProfileCard from './ProfileCard';
import './App.css'; // css file bhi add kiya h

function App() {
  return (
    <div className="App">
      <h1>My React Profile Cards</h1>
      <div className="profile-container">
        {/* yahan pe main profile card component ko use kar raha hu */}
        <ProfileCard
          name="Rajveer Singh"
          age={20}
          bio="1st year college student, learning coding with the best!"
        />
        <ProfileCard
          name="Mohan"
          age={22}
          bio="Bhaiya from the course, always helps with errors. 😂"
        />
      </div>
    </div>
  );
}

export default App;