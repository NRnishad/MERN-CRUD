import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail, checkName, checkPassword } from '../utils/validator.js';
import userAxiosInstance from '../utils/userAxiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setError, setLoading, setToken } from '../redux/slices/userSlice.js';

const Signup = () => {
  const dispatch = useDispatch()
  const { error, isLoading } = useSelector(state => state.user)
  const navigate = useNavigate()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))

    const nameError = checkName(user.name);
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);
    setUserError({ name: nameError, email: emailError, password: passwordError })
    try {
      if (!nameError && !emailError && !passwordError) {
        const res = await userAxiosInstance.post('/signup', {
          user
        })
        console.log(res.data);

        if (res.data) {
          const { userData, token } = res.data
          dispatch(setCurrentUser(userData))
          dispatch(setToken(token))
          navigate('/')
        }
      }

    } catch (error) {
      dispatch(setError(error.response?.data || 'Sign up failed'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
            {userError.name && <p className="mt-2 text-sm text-red-600">{userError.name}</p>}
          </div>

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

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-black hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

