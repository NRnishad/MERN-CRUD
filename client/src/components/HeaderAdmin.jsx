import React, { useEffect, useRef, useState } from 'react'
import { RiUserAddLine } from "react-icons/ri";
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fetchCurrentAdmin, setAdminLogout } from '../redux/slices/adminSlice';
import { checkEmail, checkName, checkPassword } from '../utils/validator';
import adminAxiosInstance from '../utils/adminAxiosInstance';

const HeaderAdmin = () => {
  const uploadInput = useRef(null)
  const [createUserModal, setCreateUserModal] = useState(false)
  const [searchBar, setSearchBar] = useState(null)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [userError, setUserError] = useState({
    name: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentAdmin(searchBar))
  }, [searchBar, dispatch])
  
  const handleLogout = () => {
    dispatch(setAdminLogout());
  }

  const handleInputButton = (e) => {
    e.preventDefault()
    uploadInput.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = checkName(user.name);
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);
    setUserError({name: nameError, email: emailError, password: passwordError})
    try {
      if(!nameError && !emailError && !passwordError){
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        if(uploadInput?.current?.files[0]){
          formData.append('profilePic', uploadInput.current.files[0])
        }

        const res = await adminAxiosInstance.post('/admin/createUser', formData)
        if(res?.data){
          setUser({name:'', email:'', password:''})
          dispatch(fetchCurrentAdmin())
          setCreateUserModal(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => setCreateUserModal(true)} 
            className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Create user
            <RiUserAddLine className="ml-2 text-xl" />
          </button>
          <input 
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Search"
            value={searchBar || ''}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <button 
            onClick={handleLogout} 
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
          >
            Logout
            <MdLogout className="ml-2 text-xl" />
          </button>
        </div>
      </header>

      {createUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New User</h2>
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  name="profilePic"
                  ref={uploadInput}
                />
                <button
                  onClick={handleInputButton}
                  className="text-4xl text-gray-400 hover:text-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  value={user.name}
                />
                {userError.name && <p className="mt-1 text-sm text-red-600">{userError.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                />
                {userError.email && <p className="mt-1 text-sm text-red-600">{userError.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
                />
                {userError.password && <p className="mt-1 text-sm text-red-600">{userError.password}</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setCreateUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Create user
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default HeaderAdmin

