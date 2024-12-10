import React from 'react';
import adminAxiosInstance from '../utils/adminAxiosInstance';
import { useDispatch } from 'react-redux';
import { fetchCurrentAdmin } from '../redux/slices/adminSlice';

const DeleteConfirmationAdmin = ({ userId, onClose }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      const res = await adminAxiosInstance.delete(`/admin/deleteUser/${userId}`)
      if(res){
        dispatch(fetchCurrentAdmin());
        onClose()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6 text-center">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationAdmin;

