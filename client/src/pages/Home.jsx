import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Home = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        {currentUser ? (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-black">Welcome, {currentUser.Name}!</h1>
            <p className="text-gray-700 text-lg">
              We're glad to see you here. Explore our features and make the most of your experience.
            </p>
            <Link 
              to="/profile" 
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              View Profile
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-black">Welcome to Our Platform</h1>
            <p className="text-gray-700 text-lg">
              Join our community to access all features and connect with others.
            </p>
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
          &copy; 2024 Our Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home

