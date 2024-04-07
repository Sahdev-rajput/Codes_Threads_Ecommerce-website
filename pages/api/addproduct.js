import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    try {
        let p;
        for(let i=0;i<req.body.length;i++)
        {
        if(req.method=='POST')
        {
            let p=new Product({
                title:req.body[i].title,
                slug:req.body[i].slug,
                desc:req.body[i].desc,
                img:req.body[i].img,
                category:req.body[i].category,
                size:req.body[i].size,
                color:req.body[i].color,
                price:req.body[i].price,
                availableQty:req.body[i].availableQty,
            })
            await p.save();
        }
        }   
        res.status(200).json({ Success: "Success"});

    } catch (error) {
        // If an error occurs, handle it appropriately
        console.error("Error adding products:", error);
        res.status(500).json({ error: "Failed to add products" });
    }
};

export default connectDb(handler);
