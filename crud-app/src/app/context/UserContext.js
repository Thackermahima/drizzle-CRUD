"use client";

import { createContext, useState, useEffect } from 'react';
import { getUsers } from '../services/api';

// Create the context
export const UserContext = createContext(null);

// Create a provider component (client-side logic)
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

