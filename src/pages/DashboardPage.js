import React, { useEffect, useState } from 'react';
import users from '../data/database.json';

const positionRank = {
  'Manager': 3,
  'Supervisor': 2,
  'Employee': 1
};

const DashboardPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [inferiorUsers, setInferiorUsers] = useState([]);

  useEffect(() => {
    // Get the logged-in user from localStorage
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedInUser(user);
      
      // Filter users with inferior positions
      const filteredUsers = users.filter(u => positionRank[u.position] < positionRank[user.position]);
      setInferiorUsers(filteredUsers);
    }
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {loggedInUser && <p>Welcome, {loggedInUser.name} ({loggedInUser.position})</p>}

      <h2>Users with Inferior Positions</h2>
      <ul>
        {inferiorUsers.map((user, index) => (
          <li key={index} className="user-item">
            <span>{user.name} - {user.position}</span>
            <button className="history-button">History</button>
            <button className="evaluation-button">Add New Evaluation</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
