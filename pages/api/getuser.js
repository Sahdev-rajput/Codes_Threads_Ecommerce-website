import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if(req.method=='POST')
    {
    var jwt = require('jsonwebtoken');
    const token=req.body.token;
    const data=jwt.verify(token,'secret123');
    let user=await User.findOne({email:data.email})
    res.status(200).json({ user: user });
    }
   else
   {
    res.status(400).json({ error: "Some Error Occured" });
   }
  }
  

export default connectDb(handler);
