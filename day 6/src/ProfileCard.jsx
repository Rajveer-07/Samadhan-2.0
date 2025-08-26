import React from 'react';
import './ProfileCard.css'; // iske liye alag css banaya

function ProfileCard(props) {
  // yaha pe props se data nikal raha hu
  const { name, age, bio } = props;

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Bio:</strong> {bio}</p>
      {/* dekho isme brackets ke andar javascript likha hai, sir ne bataya tha */}
    </div>
  );
}

export default ProfileCard;