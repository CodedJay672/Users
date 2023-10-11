import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Edit from './Edit';
import Delete from './Delete';

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState('');
  const myUser = useRef({});
  const editUser = useRef({})

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
    if (name) {
      setUsers(users.filter((user) => user.name.includes(name)));
    } else {
      window.location.reload();
    }
  }

  const openDelete = (user) => {
    setShowDeleteModal(true);
    myUser.current = user;
  }

  const openEdit = (user) => {
    setShowEditModal(true);
    editUser.current = user;
  }

  const changeChecked = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach((checkbox) => checkbox.checked = !isChecked);
  }

  return (
    <div className='w-full md:w-5/6 mx-auto my-auto flex flex-col justify-evenly items-center border border-slate-200 rounded-md'>
      <div className='w-full px-2 py-5 flex flex-row flex-wrap justify-between items-center'>
        <p className='font-sans font-bold text-xl'>Members</p>
        <form>
          <input
            type="text"
            name="name"
            value={search}
            placeholder="search"
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
              searchUsers(e.target.value);
            }}
            className='w-1200 p-2 border border-slate-500 rounded-md'
          />
        </form>
      </div>
      <div className='w-full overflow-x-auto'>
        {isLoading ? <div className='flex items-center h-200'>
          <p className='py-6 px-4 text-xs font-medium text-secondary-50 w-full text-center'>Loading users' information. Please wait!</p>
          </div> :
        <div className='my-2 overflowx-auto'>
          <div className='align-middle inline-block min-w-full'>
            <div className='overflow-hidden border-b border-gray-200'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-blue-100'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50 flex items-center gap-2'>
                      <input
                        type="checkbox"
                        name="name"
                        className='py-3 px-4 h-4 w-4 mr-3'
                        checked={isChecked}
                        onChange={() => {
                          setIsChecked(!isChecked);
                          changeChecked();
                        }}
                      />
                      <p>Name</p>
                      <ion-icon name="arrow-down-outline"></ion-icon>
                    </th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>Status</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>Email</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>Role</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>Rating</th>
                    <th scope="col" className='relative px-6 py-3'><span className='sr-only'>Edit/Delete</span></th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className='py-3 px-6 whitespace-nowrap'>
                        <div className='flex items-center gap-3'>
                          <input className='h-4 w-4 mr-2' type="checkbox" />
                          <div className='flex-shrink-0 h-10 w-10'>
                            <img loading="lazy" className='rounded-full' height="40" width="40" src="https://placebeard.it/300" alt="disp img" />
                          </div>
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-900'>{user.name}</p>
                            <p className='text-sm text-secondary-50'>@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-6 whitespace-nowrap'>
                        <p className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-tertiary-50'>Active</p>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <p className='text-sm text-gray-500'>{user.email}</p>
                      </td>
                      <td className='px-6 py-4 text-sm text-secondary-500 whitespace-nowrap'>{user.company.name}</td>
                      <td className='px-6 py-4 text-sm text-secondary-500 whitespace-nowrap'>
                        <p className="flex items-center text-sky-600">★★★★☆</p>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div key={user.id} id={user.id} className='flex items-center gap-8'>
                          <ion-icon name="trash-outline" onClick={() => openDelete(user)}></ion-icon>
                          <ion-icon name="pencil-sharp" onClick={() => openEdit(user)}></ion-icon>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>}
        <div>
          <Delete user={myUser.current} users={users} open={showDeleteModal} setUsers={setUsers} onClose={() => {
            setShowDeleteModal(false);
            myUser.current = {};
          }}/>
          <Edit user={editUser.current} open={showEditModal} onClose={
            () => {
              setShowEditModal(false);
              editUser.current = {};
            }
          }/>
        </div>
      </div>
      <div className="w-full p-10 flex flex-row justify-between items-center"><p className='hidden md:inline-block'>page {currentPage} of {Math.ceil(users.length / usersPerPage)}</p>
        <div className='w-full md:w-1/5 flex flex-row justify-between'>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className='w-2/3 p-2 border border-slate-100 rounded-md hover:bg-blue-100'>
              {i === 0 ? "Previous" : "Next"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
