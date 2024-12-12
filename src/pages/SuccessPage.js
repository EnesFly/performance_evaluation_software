import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div>
      <h1>Login Successful!</h1>
      <p>Welcome to the Performance Evaluation Software.</p>
      <Link to="/">Go Back to Login</Link>
    </div>
  );
};

export default SuccessPage;
