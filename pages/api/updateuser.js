import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if(req.method=='POST')
    {
    const {name,email,address,phone,Pincode,city,state}=req.body;
    let user=await User.findOneAndUpdate({email:email},{name:name,address:address,phone:phone,pincode:Pincode,city:city,state:state})
    res.status(200).json({ Success: true, msg:"Successfully Updated",user:user });
    }
   else
   {
    res.status(400).json({ error: "Some Error Occured" });
   }
  }
  

export default connectDb(handler);
