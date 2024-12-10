import express from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/userController.js';
import jwtVerify from '../middleware/jwtVerify.js';

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads/')
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage})


const userRoute = express.Router();

userRoute.get('/currentUser', jwtVerify, userController.getCurrentUser)
userRoute.get('/', jwtVerify, userController.getHome)
userRoute.post('/login', userController.postLogin)
userRoute.post('/signup', userController.postSignup)
userRoute.post('/uploadProfileImage', upload.single('profilePic'), jwtVerify, userController.postProfilePic)

export default userRoute