import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    const bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    if (req.method == 'POST') {
        try {
            let u = await User.findOne({email:req.body.email})
            if(u.email===req.body.email && bcrypt.compareSync(req.body.password, u.password))
            {
                var token = jwt.sign({ email:u.email, name:u.name }, 'secret123');
                res.status(200).json({ Success: true,"token":token });
            }
            else
            {
                res.status(401).json({ Failure: "Invalid Credentials" });
            }
        } catch (error) {
            res.status(500).json({ Failure: error.message });
        }
    } else {
        res.status(405).json({ Error: "Method Not Allowed" });
    }
}

export default connectDb(handler);
