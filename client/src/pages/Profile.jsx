import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userAxiosInstance from '../utils/userAxiosInstance';
import { setCurrentUser, setError, setLoading } from '../redux/slices/userSlice';
import Header from '../components/Header';

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser, isLoading } = useSelector(state => state.user)
  const uploadInput = useRef(null);

  const handleInputButton = () => {
    uploadInput.current.click();
  }

  const handleInput = (e) => {
    console.log(e.target.files[0]);
    dispatch(setLoading(true))
    
    handleImageUpload(e.target.files[0])
  }

  const handleImageUpload = async (image) => {
    const formData = new FormData;
    formData.append('profilePic', image)

    try {
      console.log(formData);
      
      const res = await userAxiosInstance.post('/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const { user } = res.data
      dispatch(setCurrentUser(user))

    } catch (error) {
      dispatch(setError(error.response?.data || 'Upload failed'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Hi, {currentUser.Name}</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex justify-center items-center bg-gray-100 overflow-hidden">
              <input 
                type='file'
                className="hidden"
                name='profilePic'
                ref={uploadInput}
                onChange={handleInput}
              />
              {isLoading && <div className="text-gray-500">Loading...</div>}
              {!currentUser?.ProfilePic && !isLoading && (
                <button onClick={handleInputButton} className='text-5xl rounded-full hover:bg-gray-200 w-full h-full text-gray-400 font-normal'>
                  +
                </button>
              )}
              {currentUser?.ProfilePic && (
                <img alt="User image" src={`http://localhost:3000${currentUser.ProfilePic}`} className='w-full h-full object-cover' />
              )}
            </div>
          </div>
          <div className='space-y-4'>
            <div className='p-4 rounded-lg bg-gray-100'>
              <div className='font-semibold text-gray-700 mb-1'>Full name</div>
              <div className='text-black'>{currentUser.Name}</div>
            </div>
            <div className='p-4 rounded-lg bg-gray-100'>
              <div className='font-semibold text-gray-700 mb-1'>Email</div>
              <div className='text-black'>{currentUser.Email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

