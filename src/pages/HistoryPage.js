import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import database from '../data/database.json';

const HistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  if (!user) {
    navigate('/dashboard');
    return null;
  }

  const kpis = database.kpis;

  return (
    <div className="container">
      <h1>{user.name}'s Evaluation History</h1>
      <button onClick={() => navigate('/dashboard')} className="back-button">Back to Dashboard</button>

      {user.evaluations.length > 0 ? (
        <ul className="evaluation-list">
          {user.evaluations
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((evaluation, index) => (
              <li key={index} className="evaluation-item">
                <h3>Evaluation on {evaluation.timestamp}</h3>
                <p><strong>Overall Score:</strong> {evaluation.overall_score}</p>
                <ul>
                  <li><strong>{kpis.KPI1_title}:</strong> {evaluation.KPI1_score}</li>
                  <li><strong>{kpis.KPI2_title}:</strong> {evaluation.KPI2_score}</li>
                  <li><strong>{kpis.KPI3_title}:</strong> {evaluation.KPI3_score}</li>
                  <li><strong>{kpis.KPI4_title}:</strong> {evaluation.KPI4_score}</li>
                  <li><strong>{kpis.KPI5_title}:</strong> {evaluation.KPI5_score}</li>
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
