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
