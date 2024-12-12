import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import database from '../data/database.json';

const HistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [currentUser, setCurrentUser] = useState(null);
  const [kpis, setKpis] = useState(database.kpis);

  useEffect(() => {
    const storedDatabase = localStorage.getItem('database');
    const currentDatabase = storedDatabase ? JSON.parse(storedDatabase) : database;

    const updatedUser = currentDatabase.users.find(u => u.email === user.email);
    setCurrentUser(updatedUser);
    setKpis(currentDatabase.kpis);
  }, [user.email]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>{currentUser.name}'s Evaluation History</h1>

      <button onClick={() => navigate('/dashboard')} className="back-button">Back to Dashboard</button>

      <h2>Key Performance Indicators (KPIs) and Weights</h2>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>KPI</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{kpis.KPI1_title}</td>
            <td>{kpis.KPI1_weight}x</td>
          </tr>
          <tr>
            <td>{kpis.KPI2_title}</td>
            <td>{kpis.KPI2_weight}x</td>
          </tr>
          <tr>
            <td>{kpis.KPI3_title}</td>
            <td>{kpis.KPI3_weight}x</td>
          </tr>
          <tr>
            <td>{kpis.KPI4_title}</td>
            <td>{kpis.KPI4_weight}x</td>
          </tr>
          <tr>
            <td>{kpis.KPI5_title}</td>
            <td>{kpis.KPI5_weight}x</td>
          </tr>
        </tbody>
      </table>

      {currentUser.evaluations.length > 0 ? (
        <ul className="evaluation-list">
          {currentUser.evaluations
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((evaluation, index) => (
              <li key={index} className="evaluation-item">
                <h3>Evaluation on {evaluation.timestamp}</h3>
                <p><strong>Overall Score:</strong> {evaluation.overall_score}</p>
                <ul>
                  {Array.from({ length: 5 }, (_, i) => (
                    <li key={i}>
                      <strong>{kpis[`KPI${i + 1}_title`]}:</strong> {evaluation[`KPI${i + 1}_score`]}
                    </li>
                  ))}
                </ul>
              </li>
          ))}
        </ul>
      ) : (
        <p>No evaluations found.</p>
      )}
    </div>
  );
};

export default HistoryPage;
