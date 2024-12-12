import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Home = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="min-h-screen bg-white">
  <main className="container mx-auto px-4 py-20 ">
        {currentUser ? (
          <div className="space-y-6 h-64">
            <h1 className="text-4xl font-bold text-black">Welcome, {currentUser.Name}😎</h1>
          </div>
        ) : (
          <div className="space-y-6 h-64">
           <h3>Plese Login or Sign Up Ones More ....</h3>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="inline-block bg-white text-black px-6 py-3 rounded-full border border-black hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
        )}
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 nishadMern. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home

