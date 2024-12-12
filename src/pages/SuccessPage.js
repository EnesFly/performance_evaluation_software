import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="container">
      <h1 className="success-message">Login Successful!</h1>
      <p>Welcome to the Performance Evaluation Software.</p>
      <Link to="/" className="link-button">Go Back to Login</Link>
    </div>
  );
};

export default SuccessPage;
