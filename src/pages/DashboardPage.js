import React, { useEffect, useState } from 'react';
import database from '../data/database.json'; // Import the whole database

const positionRank = {
  'Manager': 3,
  'Supervisor': 2,
  'Employee': 1
};

const DashboardPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [inferiorUsers, setInferiorUsers] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedInUser(user);
      
      // Use the "users" array from the database, not the whole object
      const filteredUsers = database.users.filter(u => positionRank[u.position] < positionRank[user.position]);
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
            <div className="user-info">
              <span>{user.name} - {user.position}</span>
              <div className="evaluation-score-box">
                {user.latest_evaluation_score.toFixed(2)}
              </div>
            </div>
            <div className="user-actions">
              <button className="history-button">History</button>
              <button className="evaluation-button">Add New Evaluation</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
