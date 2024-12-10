import mongoose from 'mongoose';

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

const User = mongoose.model('user',userSchema)
export default User