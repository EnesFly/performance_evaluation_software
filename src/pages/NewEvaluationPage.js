import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import database from '../data/database.json';

const NewEvaluationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  if (!user) {
    navigate('/dashboard');
    return null;
  }

  const [evaluationData, setEvaluationData] = useState({
    timestamp: new Date().toISOString().slice(0, 16), 
    KPI1_score: '',
    KPI2_score: '',
    KPI3_score: '',
    KPI4_score: '',
    KPI5_score: ''
  });

  const handleChange = (e) => {
    setEvaluationData({ ...evaluationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvaluation = {
      ...evaluationData,
      KPI1_score: parseInt(evaluationData.KPI1_score),
      KPI2_score: parseInt(evaluationData.KPI2_score),
      KPI3_score: parseInt(evaluationData.KPI3_score),
      KPI4_score: parseInt(evaluationData.KPI4_score),
      KPI5_score: parseInt(evaluationData.KPI5_score),
      overall_score: calculateOverallScore(evaluationData)
    };

    const storedDatabase = localStorage.getItem('database');
    const currentDatabase = storedDatabase ? JSON.parse(storedDatabase) : database;

    // Load the most up-to-date version of the user from localStorage
    const updatedUsers = currentDatabase.users.map(u => {
      if (u.email === user.email) {
        const updatedEvaluations = u.evaluations ? [...u.evaluations, newEvaluation] : [newEvaluation];
        return { ...u, evaluations: updatedEvaluations };
      } 
      return u;
    });

    const updatedDatabase = { ...currentDatabase, users: updatedUsers };
    localStorage.setItem('database', JSON.stringify(updatedDatabase));

    alert('New evaluation added successfully!');
    navigate('/dashboard');
  };

  const calculateOverallScore = (data) => {
    return (
      data.KPI1_score * database.kpis.KPI1_weight +
      data.KPI2_score * database.kpis.KPI2_weight +
      data.KPI3_score * database.kpis.KPI3_weight +
      data.KPI4_score * database.kpis.KPI4_weight +
      data.KPI5_score * database.kpis.KPI5_weight
    );
  };

  return (
    <div className="container">
      <h1>Add New Evaluation for {user.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Timestamp</label>
        <input type="datetime-local" name="timestamp" value={evaluationData.timestamp} onChange={handleChange} />

        {['KPI1_score', 'KPI2_score', 'KPI3_score', 'KPI4_score', 'KPI5_score'].map((kpi, index) => (
          <div key={index}>
            <label>{database.kpis[`KPI${index + 1}_title`]}</label>
            <input 
              type="number" 
              name={kpi} 
              min="1" 
              max="7" 
              value={evaluationData[kpi]} 
              onChange={handleChange} 
              required 
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEvaluationPage;
