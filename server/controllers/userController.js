import bcrypt from 'bcrypt';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

const getCurrentUser = async (req,res)=>{
  try {

    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json(error)
  }
}

const postLogin = async (req,res)=>{
  try {
    const {email, password} = req.body.user;
    const userData = await User.findOne({Email: email});
    if(!userData){
      return res.status(400).json('User not found');
    }else{
      const checkPassword = await bcrypt.compare(password, userData.Password)
      if(!checkPassword){
         return res.status(400).json('Password mismatch')
      }else{
        const token = await jwt.sign({_id: userData._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          samSite: 'lax'
        })
        
        return res.status(200).json({userData, token})
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  }
}

const postSignup = async (req,res)=>{
  try {
    const {name, email, password} = req.body.user;

    const userExist = await User.findOne({Email: email});
    if(userExist) return res.status(400).json('User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)
    if(hashedPassword){
      const userData = await User.create({Name: name, Email: email, Password: hashedPassword})
      console.log(userData);
      
      if(userData){
        const token = await jwt.sign({_id:userData._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          samSite: 'lax'
        })
        res.status(200).json({userData, token})
      }
    }
    
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
    
  }
}

const getHome = async (req,res)=>{
  try {
    res.status(200).json(req.user)
    
    
  } catch (error) {
    
  }
}

const postProfilePic = async (req,res)=>{
  try {
    
    const profilePic = `/uploads/${req.file.filename}`;

    const user = req.user;
    user.ProfilePic = profilePic
    await user.save();
    console.log(user);
    
    res.status(200).json({user})

  } catch (error) {
    console.log(error);
    
  }
}



export default {
  getCurrentUser,
  postLogin, 
  postSignup,
  getHome,
  postProfilePic,

  
}