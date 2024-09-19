"use client";

import { useState, useEffect } from 'react';
import { getUsers } from './services/api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

export default function Home() {
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
    <div className="container">
      <h1 className="my-4">User Management</h1>

      <div className="row">
        <div className="col-md-6">
          <UserForm currentUser={currentUser} setCurrentUser={setCurrentUser} fetchUsers={fetchUsers} />
        </div>

        <div className="col-md-6">
          <UserTable users={users} setCurrentUser={setCurrentUser} fetchUsers={fetchUsers} />
        </div>
      </div>
    </div>
  );
}
