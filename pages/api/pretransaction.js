import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import axios from 'axios'; 

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.TotalAmount==0)
        {
            res.status(200).json({ "Qty": false, "msg": "Cannot Proceed with empty cart having products of amount Zero!" }); 
            return;  
        }
        if(req.body.phone.length!=10)
        {
            res.status(200).json({ "Qty": false, "msg": "Enter a 10 digit Phone Number which is reachable" }); 
            return;  
        }
        try {
            let newOrder = new Order({
                email: req.body.email,
                Order_id: req.body.Order_id,
                payment_Info: "CASH ON DELIVERY",
                products: req.body.cart,
                address: req.body.address,
                amount: req.body.TotalAmount,
                pincode: req.body.Pincode,
                phone: req.body.phone,
                status: 'Pending',
            })
            let calculatedAmount=0,calculatedCost=0;
            for(let item of req.body.cart)
            {
                calculatedCost+=(item.qty*item.price)
                let requiredQty=item.qty
                let product=await Product.find({slug:item.itemCode['slug']})
                if(product[0].availableQty<requiredQty)
                {
                    res.status(200).json({ "Qty": false, "msg": "The Item has gone out of Stock. Please either reduce your quantity or wait for the stock." }); 
                    return; 
                }
                calculatedAmount+=(product[0].price*item.qty)
            }
            if(calculatedAmount!==calculatedCost)
            {
                res.status(200).json({ "Status": true, "msg": "You have tampered with the localStorage." });
            }
            else
            {
            let d = await newOrder.save();
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, { email: req.body.email, order_id: req.body.Order_id, cart:req.body.cart });
            res.status(200).json({ "Success": "Order Saved Successfully", "redirectTo": "/order?id="+d._id+"&Clear_the_cart=1" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "Error": "Some Error Occurred" });
        }
    } else {
        res.status(404).json({ "Error": "Method not Allowed" });
    }
}

export default connectDb(handler);
