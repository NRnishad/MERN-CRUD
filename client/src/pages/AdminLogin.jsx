import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAdmin, setLoadingAdmin, setAdminToken, setAdminError} from '../redux/slices/adminSlice'
import { checkEmail, checkPassword } from '../utils/validator'
import adminAxiosInstance from '../utils/adminAxiosInstance'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminError, isLoadingAdmin } = useSelector(state => state.admin)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [userError, setUserError] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingAdmin(true))
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);

    setUserError({ email: emailError, password: passwordError })

    try {
      if (!emailError && !passwordError) {
        const response = await adminAxiosInstance.post('/login', { user });
        if (response) {
          const { userData, token } = response.data

          if (!userData.IsAdmin) {
            dispatch(setAdminError('Not a valid admin'))
            return
          }

          dispatch(setCurrentAdmin(userData));
          dispatch(setAdminToken(token))
          navigate('/admin')
        }
      }
    } catch (error) {
      dispatch(setAdminError(error.response?.data || 'Login failed'))
      console.log(error);
    } finally {
      dispatch(setLoadingAdmin(false))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
            {userError.email && <p className="mt-2 text-sm text-red-600">{userError.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
            {userError.password && <p className="mt-2 text-sm text-red-600">{userError.password}</p>}
          </div>

          {adminError && <p className="text-sm text-red-600 text-center">{adminError}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            disabled={isLoadingAdmin}
          >
            {isLoadingAdmin ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin

