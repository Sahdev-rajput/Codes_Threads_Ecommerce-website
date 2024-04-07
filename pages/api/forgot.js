import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler=async(req, res)=> {
    let email=req.body.email;
    let u=await User.findOne({email:email})
    if(u==null)
    {
        res.status(404).json({ Success: false});
        return;
    }
    res.status(200).json({ Success: true });
  }
  

export default connectDb(handler);