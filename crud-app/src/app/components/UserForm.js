"use client";

import { useState, useEffect } from 'react';
import { addUser, updateUser } from '../services/api';

const UserForm = ({ currentUser, setCurrentUser, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAge(currentUser.age);  


    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, age: parseInt(age) };

    if (currentUser) {
      // Update existing user
      await updateUser(currentUser.id, userData);
    } else {
      // Add new user
      await addUser(userData);
    }
    
    fetchUsers(); // Refresh user list
    setCurrentUser(null); // Reset current user
    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input
          type="number"
          className="form-control"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
