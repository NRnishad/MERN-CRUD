import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/userAxiosInstance';
import adminAxiosInstance from '../../utils/adminAxiosInstance';


const getInitialToken = () => {
  try {
    return localStorage.getItem('adminToken') || null;
  } catch {
    return null;
  }
};

const adminSlice = createSlice({
  name:'admin',
  initialState: {
    users:  [],
    currentAdmin: null,
    adminToken: getInitialToken(),
    isLoadingAdmin: false,
    adminError: null
  },
  reducers: {

    setUsers: (state, action)=>{
      state.users = action.payload
    },
    setCurrentAdmin: (state, action)=>{
      state.currentAdmin = action.payload;
    },
    setAdminToken: (state, action)=>{
      state.adminToken = action.payload;
      localStorage.setItem('adminToken', action.payload)
    },
    setAdminError: (state, action)=>{
      state.adminError = action.payload
    },
    setLoadingAdmin: (state, action)=>{
      state.isLoadingAdmin = action.payload
    },
    setAdminLogout: (state)=>{
      state.currentAdmin = null;
      state.adminToken = null;
      localStorage.removeItem('adminToken')
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCurrentAdmin.pending, (state)=>{
      state.isLoadingadmin = true;
      state.adminError = null;
    })
    .addCase(fetchCurrentAdmin.fulfilled, (state, action)=>{
      state.users = action.payload.users
      state.isLoadingAdmin = false;
      state.currentAdmin = action.payload.user;
      state.adminerror = null
    })
    .addCase(fetchCurrentAdmin.rejected, (state, action)=>{
      state.isLoadingAdmin = false;
      state.currentAdmin = null;
      state.adminError = action.payload;
    })
  }
})

export const fetchCurrentAdmin = createAsyncThunk(
  'admin/fetchCurrentAdmin',
  async (arg=null, {rejectWithValue})=>{
    try {
      const adminToken = localStorage.getItem('adminToken')|| null
      if(!adminToken) return rejectWithValue('No Token Found')

        const res = await adminAxiosInstance.get('/admin/currentAdmin')
        if(!res.data.user.IsAdmin) return rejectWithValue('Not an admin')
          if(arg){
            const filtered = res.data.users.filter(user => user.Name.toLowerCase().includes(arg.toLowerCase()));
            res.data.users = filtered;
            return res.data
          }else{
            return res.data
          }
        
    } catch (error) {
      localStorage.removeItem('adminToken');
      return rejectWithValue(error.response?.data || 'Failed to fetch the admin')
    }
  }
)

export const {
  setUsers, 
  setCurrentAdmin, 
  setAdminToken, 
  setAdminError, 
  setLoadingAdmin, 
  setAdminLogout
} = adminSlice.actions

export default adminSlice.reducer;