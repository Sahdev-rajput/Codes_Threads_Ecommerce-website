import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    try {
        for(let i=0;i<req.body.length;i++)
        {
            let p=await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]);
        }   
        res.status(200).json({ Success: "Success" });

    } catch (error) {
        // If an error occurs, handle it appropriately
        console.error("Error adding products:", error);
        res.status(500).json({ error: "Failed to add products" });
    }
};

export default connectDb(handler);
