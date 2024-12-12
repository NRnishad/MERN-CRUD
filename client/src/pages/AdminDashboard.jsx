import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiEdit, FiTrash } from 'react-icons/fi';
import EditModalAdmin from '../components/EditModalAdmin';
import DeleteConfirmationAdmin from '../components/DeleteConfirmationAdmin';


const AdminDashboard = () => {
  const { users } = useSelector(state => state.admin)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleEdit = (userId) => {
    setUserId(userId);
    setEditModalOpen(true)
  }

  const handleDelete = (userId) => {
    setUserId(userId);
    setDeleteModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Users</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {users.length > 0 ? users.map(user => (
            <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  alt={`profile picture`}
                  src={`http://localhost:3000${user?.ProfilePic || '/uploads/userAvatar.png'}`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="absolute top-0 right-0 flex gap-2">
                  <button
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                    onClick={() => handleEdit(user._id)}
                    aria-label={`Edit ${user.Name}`}
                  >
                    <FiEdit className="text-gray-700 text-lg" />
                  </button>
                  <button
                    className="p-1 bg-red-200 rounded-full hover:bg-red-300 transition duration-200"
                    onClick={() => handleDelete(user._id)}
                    aria-label={`Delete ${user.Name}`}
                  >
                    <FiTrash className="text-red-700 text-lg" />
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.Name}</h2>
              <p className="text-gray-600 text-sm">{user?.Email}</p>
            </div>
          )) : (
            <div className="col-span-full text-center text-xl font-semibold text-gray-500 py-12">
              No Users Found
            </div>
          )}
        </div>
      </div>
      {editModalOpen && (
        <EditModalAdmin
          userId={userId}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteConfirmationAdmin
          userId={userId}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminDashboard

