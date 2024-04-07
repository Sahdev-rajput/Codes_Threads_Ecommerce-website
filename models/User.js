import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  address:{type:String},
  state:{type:String},
  city:{type:String},
  pincode:{type:Number},
  phone:{type:Number},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("User",UserSchema)