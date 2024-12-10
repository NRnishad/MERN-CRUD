import axios from "axios";

const userAxiosInstance = axios.create({
  baseURL:"http://localhost:3000",
  withCredentials: true
})

userAxiosInstance.interceptors.request.use(config=>{
  const token = localStorage.getItem('userToken');
  if(token){
    config.headers.Authorization = token;
  }
  return config
})

export default userAxiosInstance;