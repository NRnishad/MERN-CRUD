import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmail, checkPassword } from '../utils/validator'
import userAxiosInstance from '../utils/userAxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser, setError, setLoading, setToken } from '../redux/slices/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, isLoading } = useSelector(state => state.user)
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
    dispatch(setLoading(true))
    const emailError = checkEmail(user.email);
    const passwordError = checkPassword(user.password);

    setUserError({ email: emailError, password: passwordError })

    try {
      if (!emailError && !passwordError) {
        const response = await userAxiosInstance.post('/login', { user });
        if (response) {
          const { userData, token } = response.data
          dispatch(setCurrentUser(userData));
          dispatch(setToken(token))
          navigate('/')
        }
      }
    } catch (error) {
      dispatch(setError(error.response?.data || 'Login failed'))
      console.log(error);
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Login</h1>
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

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New to here?{' '}
          <Link to="/signup" className="font-medium text-black hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

