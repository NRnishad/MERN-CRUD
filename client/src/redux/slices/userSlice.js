import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userAxiosInstance from '../../utils/userAxiosInstance';


const getInitialToken = () => {
  try {
    return localStorage.getItem('userToken') || null;
  } catch {
    return null;
  }
};

const userSlice = createSlice({
  name:'user',
  initialState: {
    currentUser: null,
    token: getInitialToken(),
    isLoading: false,
    error: null
  },
  reducers: {

    setCurrentUser: (state, action)=>{
      state.currentUser = action.payload;
    },
    setToken: (state, action)=>{
      state.token = action.payload;
      localStorage.setItem('userToken', action.payload)
    },
    setError: (state, action)=>{
      state.error = action.payload
    },
    setLoading: (state, action)=>{
      state.isLoading = action.payload
    },
    setLogout: (state)=>{
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('userToken')
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCurrentUser.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null
    })
    .addCase(fetchCurrentUser.rejected, (state, action)=>{
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload;
    })
  }
})

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, {rejectWithValue})=>{
    try {
      const token = localStorage.getItem('userToken')|| null
      
      if(!token) return rejectWithValue('No Token Found')

        const res = await userAxiosInstance.get('/currentUser')
        return res.data
        
    } catch (error) {
      localStorage.removeItem('userToken');
      return rejectWithValue(error.response?.data || 'Failed to fetch the user')
    }
  }
)

export const {
  setCurrentUser, 
  setToken, 
  setError, 
  setLoading, 
  setLogout
} = userSlice.actions

export default userSlice.reducer;