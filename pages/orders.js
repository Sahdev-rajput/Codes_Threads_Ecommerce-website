import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

const Orders = () => {
  const router = useRouter();
  const [myOrders, setmyOrders] = useState([])

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
    if (!localStorage.getItem('token')) {
      router.push("/");
      return;
    }
    async function getOrders() {
      let submitData = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({ token: submitData }),
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await res.json();
      localStorage.setItem('email',data.email)
      setmyOrders(data.order);
    }
    getOrders();
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order_id
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              PinCode
            </th>
            <th scope="col" className="px-6 py-3">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((item) => {
            return (
              <tr key={item._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link href={`/order?id=${item._id}`}>{item._id}</Link>
                </th>
                <td className="px-6 py-4">
                  {item.amount}
                </td>
                <td className="px-6 py-4">
                {formatTimestamp(item.createdAt)}
                </td>
                <td className="px-6 py-4">
                  {item.pincode}
                </td>
                <td className="px-6 py-4">
                  {item.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
