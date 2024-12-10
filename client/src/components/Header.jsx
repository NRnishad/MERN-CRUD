import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/slices/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(setLogout());
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to='/' className='text-black font-bold text-xl hover:text-gray-700 transition-colors'>
          Home
        </Link>
        <div className="flex items-center space-x-4">
          <Link to='/profile' className='flex items-center hover:bg-gray-100 p-2 rounded-full transition-colors'>
            <FaUser className='text-black text-xl' />
            <span className='ml-2 text-black font-semibold'>{currentUser?.Name}</span>
          </Link>
          <button onClick={handleLogout} className='flex items-center hover:bg-gray-100 p-2 rounded-full transition-colors'>
            <MdLogout className='text-black text-xl' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

