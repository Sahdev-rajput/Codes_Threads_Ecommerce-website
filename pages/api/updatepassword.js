import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    const bcrypt = require('bcrypt');
    const saltRounds=10;
    if(req.method=='POST')
    {
    const {email,opassword,npassword}=req.body;
    let u = await User.findOne({email:email})
    if(!bcrypt.compareSync(opassword, u.password))
    {
        res.status(404).json({ Success: false, msg:"old password does not match." });
        return;   
    }
    const hash = bcrypt.hashSync(npassword, saltRounds);
    let user=await User.findOneAndUpdate({email:email},{password:hash});
    res.status(200).json({ Success: true, msg:"Password updated successfully!",user:user });
    }
   else
   {
    res.status(400).json({ error: "Some Error Occured" });
   }
  }
  

export default connectDb(handler);
