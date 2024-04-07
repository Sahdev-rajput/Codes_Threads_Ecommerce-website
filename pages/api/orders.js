import Order from '@/models/Order';
import connectDb from '@/middleware/mongoose';

const handler = async (req, res) => {
    var jwt = require('jsonwebtoken');
    const token=req.body.token
    const data=jwt.verify(token,'secret123');
    let orders=await Order.find({email: data.email})
    res.status(200).json({order:orders,email:data.email})
  }
  
export default connectDb(handler);
