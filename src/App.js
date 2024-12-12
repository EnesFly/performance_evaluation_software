import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import NewEvaluationPage from './pages/NewEvaluationPage';
import Header from './components/Header';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/new-evaluation" element={<NewEvaluationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
