// frontend/src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [skills, setSkills] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const response = await axios.post('/search', { skills: skills.split(',') });
    setUsers(response.data);
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Enter skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Results</h2>
        {users.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
            <p>Skills: {user.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
