"use client";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { deleteUser } from '../services/api';

const UserTable = () => {
  const { users, setCurrentUser, fetchUsers } = useContext(UserContext);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => setCurrentUser(user)}
              >
                <i className="bi bi-pencil"></i> Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
