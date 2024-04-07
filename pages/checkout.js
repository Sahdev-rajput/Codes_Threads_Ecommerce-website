import React, { useState,useEffect } from 'react'
import { FaLock } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const checkout = ({ cart, TotalAmount, addQuantity, minusQuantity }) => {
    const router=useRouter();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState(0)
    const [Pincode, setPincode] = useState(0)
    const [city, setcity] = useState('')
    const [state, setstate] = useState('')
    const [disable, setdisable] = useState(true)
    
    const currentDetails=async ()=>{
        let submitData;
        if(localStorage.getItem('token'))
        {
           submitData={token:localStorage.getItem('token')};
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
          method: 'POST',
          body: JSON.stringify(submitData),
          headers: {
            'content-type': 'application/json'
          }
        })
        const data=await res.json();
        console.log();
        setname(data.user.name)
        setemail(data.user.email)
        setphone(data.user.phone)
        setaddress(data.user.address)
        setcity(data.user.city)
        setstate(data.user.state)
        setPincode(data.user.pincode)
      }

    const handleChange =async (e) => {
        if (e.target.name === 'Name') {
            setname(e.target.value);
        }
        else if (e.target.name === 'Email') {
            setemail(e.target.value);
        }
        else if (e.target.name === 'Phone') {
            setphone(e.target.value);
        }
        else if (e.target.name === 'Pincode') {
            setPincode(e.target.value);
            if(e.target.value.length==6)
            {
                let cityPins=await fetch("http://localhost:3000/api/service");
                let cities=await cityPins.json();
                for(let item in cities)
                {
                    if(item===e.target.value)
                    {
                        setcity(cities[item][0])
                        setstate(cities[item][1])
                    }
                }
            }
            else{
                setcity('')
                setstate('')
            }
        }
        else if (e.target.name === 'Address') {
            setaddress(e.target.value);
        }
        if(name.length>3 && email.length>3 && address.length>3 && phone.length>3 && Pincode.length>3)
        {
            setdisable(false);
        }
        else
        {
            setdisable(true);
        }
    }


    const handleClick=async()=>{
        try {
            let pinjson = await fetch("http://localhost:3000/api/service");
        let pins = await pinjson.json();
        if (!Object.keys(pins).includes(Pincode)) {
            toast.error('Sorry! We can not deliver to your location Currently!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
              });
              return;
            }
            let Order_id=JSON.stringify(Math.random()*Date.now());
            let data={name,email,phone,Pincode,address,TotalAmount,cart,Order_id};
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            })
            let result=await res.json();
            if(!result.Qty)
            {
                toast.error(result.msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                    });
            }
            if(result.Status)
            {
                toast.error('Sorry! you have tampered with the localStorage. You cannot make payment. Please Clear your cart and Checkout again!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                    });
            }
            if(result.Success)
            {
                toast.success('Congratulations! Your Order have been placed successfully.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                });
                setTimeout(() => {
                    router.push(result.redirectTo);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        currentDetails();
       if(localStorage.getItem('email'))
       {
        let data=localStorage.getItem('email')
        setemail(data);
       }
    }, []);
    
    return (
        <div className='m-auto ml-4 mr-4 md:ml-16 md:mr-16'>
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
            />
        <p className='font-bold text-2xl text-center'>Checkout</p>
            <p className=' mt-5 font-semibold text-lg'>1. Checkout Details:</p>
            <div className='flex flex-row  space-x-1  md:space-x-3'>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='Name'>Name</label>
                    <input onChange={handleChange} value={name} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Name" id="Name" type="text" placeholder='Enter the Name'></input>
                </div>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='Email'>Email</label>
                    {email!='' && <input onChange={handleChange} value={email} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Email" id="Email" type="Email" placeholder='Enter the Email' readOnly={true}></input>
}
{email=='' && <input onChange={handleChange} value={email} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Email" id="Email" type="Email" placeholder='Enter the Email'></input>
}
                </div>
            </div>
            <div className='flex flex-row space-x-1 md:space-x-3 mt-5'>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='Address'>Address</label>
                    <textarea onChange={handleChange} value={address} className="px-2 py-2 border-2 rounded-lg border-gray-400" id="Address" name="Address" rows={3}></textarea>
                </div>
            </div>
            <div className='flex flex-row space-x-1 md:space-x-3 mt-5'>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='Phone'>Phone</label>
                    <input onChange={handleChange} value={phone} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Phone" id="Phone" type="number" placeholder='Enter the Phone Number'></input>
                </div>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='Pincode'>Pincode</label>
                    <input onChange={handleChange}  value={Pincode} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Pincode" id="Pincode" type="text" placeholder='Enter Pincode'></input>

                </div>
            </div>
            <div className='flex flex-row space-x-1 md:space-x-3 mt-5'>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='State'>State</label>
                    <input value={state} onChange={handleChange} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="State" id="State" type="text" readOnly={true}></input>
                </div>
                <div className='flex flex-col w-[100vw]'>
                    <label htmlFor='City'>City</label>
                    <input value={city} onChange={handleChange} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="City" id="City" type="text" readOnly={true}></input>
                </div>
            </div>
            <p className=' mt-5 font-semibold text-lg'>2. Review Cart Items and pay:</p>
            <div className='bg-indigo-50 h-60 w-full'>
                <p className='mt-5 font-bold text-center'>Shopping Cart</p>
                <ol className='mt-2'>
                    {
                        cart.map((item, index) => (
                            <li key={item.itemCode} className='flex flex-row mt-3'>
                                <span className='ml-2 mr-2'>{index + 1}.</span>
                                {item.title}(item.variant/item.size) X
                                <FaMinusCircle onClick={() => minusQuantity(item.itemCode)} className='ml-2 mt-1' /><span className='ml-1'>{item.qty}</span><FaPlusCircle onClick={() => addQuantity(item.itemCode)} className='ml-1 mt-1' />
                            </li>
                        ))
                    }
                </ol>
                <p className='text-center font-semibold text-md mb-2'>Net Amount: ₹ {TotalAmount}</p>
            </div>
            {
                TotalAmount != 0 &&
                <button disabled={disable} onClick={handleClick} className="flex mt-5 text-white disabled:bg-indigo-200 bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded"><FaLock className='mr-1 pt-0.5 items-center' />Pay ₹ {TotalAmount}</button>

            }
        </div>
    )
}

export default checkout