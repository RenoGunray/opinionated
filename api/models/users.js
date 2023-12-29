import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  image: {type:String, required:false},
  username: {type:String, required:true, unique:true},
  full_name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;