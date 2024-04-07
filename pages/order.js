import React,{useEffect,useState} from 'react'
import mongoose from 'mongoose';
import Order from '@/models/Order';
import { useRouter } from 'next/router';

const orderComponent = (props) => {
  const [date, setdate] = useState('');
  const router=useRouter();
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp); // Parse the timestamp
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes}:${date.getSeconds()} ${ampm}`;
  
    return `${day} ${month} ${year}, ${formattedTime}`;
  }

  useEffect(() => {
    let utc_date=props.order.createdAt; 
    let o_date=formatTimestamp(utc_date)
    setdate(o_date)
    if(!props.populate)
    {
       router.push("/checkout");
    }
   const Clear=router.query.Clear_the_cart;
   if(Clear==1)
   {
    localStorage.removeItem('cart'); // Remove a particular item from local storage
    localStorage.removeItem('TotalAmount'); // Remove a particular item from local storage
  }
  }, [])
  
  return (
    <div className='m-auto'>
      <section className=" text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto"> {/* Added text-center class to center all content */}
          <div className="lg:w-4/5 mx-auto">
            <div className=""> {/* No need for text-center here as it's already inside the centered container */}
              <h2 className="text-sm text-center title-font text-gray-500 tracking-widest">Codes Threads</h2>
              <h1 className="text-gray-900 text-3xl text-center title-font font-medium mb-4">Order_id: {props.order._id}</h1>
              <h2><span className='font-semibold'>Date: </span>{date}</h2>
              <h2><span className='font-semibold'>Pincode: </span>{props.order.pincode}</h2>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-11">Quantity</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
              </div>
              {props.order.products.map((order, index) => (
                <div className="flex border-t border-gray-200 py-2" key={index}>
                    <span className="text-gray-500">{order.title}</span>
                    <span className="mx-auto text-gray-900">{order.qty}</span>
                    <span className="ml-auto text-gray-900">₹ {order.qty*order.price}</span>
                  </div>
              ))}

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹ {props.order.amount}</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let id = context.query.id;
  let orders = await Order.findById(id);
  let populate=true;
  if(orders.status!='Paid')
  {
      populate=false;
  }
  const serializedOrder = JSON.parse(JSON.stringify(orders));
  return { props: { order: serializedOrder,populate:populate } };
};

export default orderComponent
