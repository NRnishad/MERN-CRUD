import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({

  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  IsAdmin: {
    type: Boolean,
    default: false
  },
  ProfilePic: {
    type: String,
    default: null
  }

})



userSchema.methods.getJWT = async function () {
const  userData = this
  const token = await jwt.sign({_id: userData._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
  return token
}

userSchema.methods.verifyPassword = async function (params) {
  const  userData = this
  const checkPassword = await bcrypt.compare(params, userData.Password)
  return checkPassword
}

const User = mongoose.model('user',userSchema)
export default User