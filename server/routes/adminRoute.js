import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import adminController from '../controllers/adminController.js';
import multer from 'multer';
import path from 'path'
const adminRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads/')
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage})

adminRoute.get('/currentAdmin', jwtVerify, adminController.getCurrentAdmin);
adminRoute.post('/createUser', jwtVerify, upload.single('profilePic'), adminController.postCreateUser);
adminRoute.put('/updateUser/:id', jwtVerify, upload.single('profilePic'), adminController.putUpdateUser)
adminRoute.delete('/deleteUser/:id', jwtVerify, adminController.deleteUser)


export default adminRoute