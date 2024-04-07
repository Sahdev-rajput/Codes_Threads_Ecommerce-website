import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email:{type:String,required:true},
  Order_id:{type:String,required:true},
  payment_Info:{type:Object,required:true},
 products:{type:Object,required:true},
 address:{type:String,required:true},
 amount:{type:Number,required:true},
 pincode:{type:Number,required:true},
 phone:{type:Number,required:true},
 status:{type:String,default:'Pending',required:true},
 deliveryStatus:{type:String,default:'UnShipped',required:true},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("Order",OrderSchema)