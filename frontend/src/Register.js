// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [skills, setSkills] = useState('');

  const handleRegister = async () => {
    const response = await axios.post('/register', { skills: skills.split(',') });
    alert('User registered successfully!');
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
