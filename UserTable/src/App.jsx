import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
      setIsLoading(!isLoading);
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser).sort();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const searchUsers = (name) => {
    setUsers(users.filter((user) => user.name === name))
  }

  if (isLoading) {
    return <p>Fetching users data. Please wait!</p>
  }

  return (
    <>
    <div>
      <p className="text-3xl font-bold underline">Members</p>
      <form onSubmit={() => searchUsers(name)}>
        <input type="text" name="name" placeholder="search" onChange={(e) => setName(e.target.value)} />
      </form>
    </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Role</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <h4>{user.name}</h4>
                <p>{user.username}</p>
              </td>
              <td>
                <p>active</p>
              </td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>5 star</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <p>Showing {indexOfFirstUser} to {indexOfLastUser} of {users.length} </p>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i === 0 ? "Previous" : "Next"}
          </button>
        ))}
      </div>
    </>
  );
}
