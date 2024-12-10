import axios from "axios";

const adminAxiosInstance = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials: true
})

adminAxiosInstance.interceptors.request.use(config=>{
  const token = localStorage.getItem('adminToken');
  if(token){
    config.headers.Authorization = token;
  }
  return config
})

export default adminAxiosInstance;