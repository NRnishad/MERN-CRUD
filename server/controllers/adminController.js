import User from "../model/userModel.js"
import bcrypt from 'bcrypt';


const getCurrentAdmin = async (req,res)=>{
  try {
    const {user} = req
    const users = await User.find({IsAdmin:false});

    res.status(200).json({users, user})
    
  } catch (error) {
    res.status(500).json(error)
  }
}

const postCreateUser = async(req,res)=>{
  try{
    
    let profilePic = ''
    const {name, email, password} = req.body
    if(req?.file?.filename){
     profilePic = `/uploads/${req.file.filename}`
    }

    const userExist = await User.findOne({Email: email});
    if(userExist) return res.status(400).json('User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)
    if(hashedPassword){
      const userData = await User.create({Name: name, Email: email, Password: hashedPassword, ProfilePic: profilePic})
      
      if(userData){
        res.status(200).json(userData)
      }
    }

  } catch (error) {
    res.status(500).json(error);
    
  }
}

const putUpdateUser = async(req, res)=>{
  try {
    const { name, email, password } = req.body;
    let profilePic = '';

    if (req.file) {
      profilePic = `/uploads/${req.file.filename}`;
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json('User not found');

    user.Name = name || user.Name;
    user.Email = email || user.Email;
    if (profilePic) {
      user.ProfilePic = profilePic;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.Password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
}

const deleteUser = async(req, res)=>{
  try {
    
    const isDelete = await User.deleteOne({_id:req.params.id});

    if(isDelete.deletedCount>0){
    res.status(200).json('Deleted successfully')
    }else{
      res.status(400).json('Deletion failed')
    }

  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
}



export default {
  getCurrentAdmin,
  postCreateUser, 
  putUpdateUser,
  deleteUser,  
}