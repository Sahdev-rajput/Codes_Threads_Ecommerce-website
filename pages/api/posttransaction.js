import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    try {
        await Order.findOneAndUpdate(
            { Order_id: req.body.order_id}, 
            { $set: { status: 'Paid' } } 
        ); 
        for (let item of req.body.cart) {
            let requiredQty = item.qty;
            await Product.findOneAndUpdate(
                { slug: item.itemCode.slug }, 
                { $inc: { availableQty: -requiredQty } } 
            );
        }
        res.status(200).json({ "Success":"Successfully updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Some Error Occurred" });
    }
}

export default connectDb(handler);
