import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const Navbar = () => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleLogout = async () => {
    await auth.signOut()
    navigate('/')   // redirect after logout
  }

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {/* Right side buttons */}
      {user ? (
        // 🔥 Firebase User Menu
        <div className="relative group">
          <img
            src={user.photoURL || assets.user_default}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
          />

          {/* Dropdown */}
          <div className="absolute right-0 hidden group-hover:flex flex-col bg-white shadow-md rounded-lg mt-3 py-2 w-40">
            <p className="px-4 py-2 text-sm text-gray-600 border-b">
              {user.email}
            </p>
            <button
              className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

      ) : (
        // 🔥 If not logged in → send to custom Sign In page
        <button
          onClick={() => navigate('/signin')}
          className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
        >
          Get started <ArrowRight className='w-4 h-4' />
        </button>
      )}

    </div>
  )
}

export default Navbar