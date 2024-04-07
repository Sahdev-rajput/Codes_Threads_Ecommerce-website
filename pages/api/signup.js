import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
    if (req.method == 'POST') {
        try {
          let myPlaintextPassword = req.body.password;
          const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
            let u = new User({name:req.body.name,email:req.body.email,password:hash});
            await u.save();
            res.status(200).json({ Success: true });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    } else {
        res.status(405).json({ Error: "Method Not Allowed" });
    }
}

export default connectDb(handler);
