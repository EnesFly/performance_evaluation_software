import React, { createContext, useState } from 'react';
import initialDatabase from '../data/database.json';

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [database, setDatabase] = useState(initialDatabase);

  const updateUserEvaluation = (userEmail, newEvaluation) => {
    const updatedUsers = database.users.map(user => 
      user.email === userEmail 
        ? { ...user, evaluations: [...user.evaluations, newEvaluation] } 
        : user
    );
    setDatabase({ ...database, users: updatedUsers });
  };

  return (
    <DatabaseContext.Provider value={{ database, updateUserEvaluation }}>
      {children}
    </DatabaseContext.Provider>
  );
};
