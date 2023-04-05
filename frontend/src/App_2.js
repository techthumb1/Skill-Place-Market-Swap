// frontend/src/App.js
 import React, { useState } from 'react';
 import axios from 'axios';
 
 function App() {
   const [skills, setSkills] = useState('');
   const [users, setUsers] = useState([]);
 
   const handleRegister = async () => {
     const response = await axios.post('/register', { skills: skills.split(',') });
     alert('User registered successfully!');
   };
 
   const handleSearch = async () => {
     const response = await axios.post('/search', { skills: skills.split(',') });
     setUsers(response.data);
   };
 
   return (
     <div className="App">
       <h1>Skill Place Market Swap</h1>
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
       <div>
         <h2>Search</h2>
         <input
           type="text"
           placeholder="Enter skills (comma-separated)"
           value={skills}
           onChange={(e) => setSkills(e.target.value)}
         />
         <button onClick={handleSearch}>Search</button>
       </div>
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
 
 export default App;
 