import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const jwtVerify = async (req, res, next)=>{
  try {
    
    const token = req.headers.authorization;

    const decodedValue = await jwt.verify(token, process.env.JWT_SECRET);
    if(decodedValue){
      const user = await User.findById(decodedValue._id);
      if(user){
        req.user = user;
        next()
      }
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json('Invalid cookie')
  }
}

export default jwtVerify