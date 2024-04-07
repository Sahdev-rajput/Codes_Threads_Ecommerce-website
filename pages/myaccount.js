import React, { useState, useEffect } from 'react'
import { FaLock } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myaccount = ({ cart, TotalAmount, addQuantity, minusQuantity }) => {
  const router = useRouter();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState(0)
  const [Pincode, setPincode] = useState(0)
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [opassword, setopassword] = useState('')
  const [npassword, setnpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

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

  const handleDetailsChange = async() => {
    if (Pincode.length == 6) {
      let cityPins = await fetch("http://localhost:3000/api/service");
      let cities = await cityPins.json();
      for (let item in cities) {
        if (item === Pincode) {
          setcity(cities[item][0])
          setstate(cities[item][1])
        }
      }
    }
    else {
      setcity('')
      setstate('')
    }
    let submitData={name,email,address,phone,Pincode,city,state};
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,{
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data=await res.json();
    if(data.Success)
    {
      toast.success('Details Updated Successfully!', {
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
    }
  }

  const handlePasswordChange = async() => {
     if(npassword!=cpassword)
     {
      toast.error('Confirm Password does not match with new password!', {
        position: "top-center",
        autoClose: 2000,
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
     let submitData={email,opassword,npassword};
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,{
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data=await res.json();
    if(data.Success)
    {
      toast.success('Password Updated Successfully!', {
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
    }
    else
    {
      toast.error('Password not updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });
    }
    setopassword('');
    setnpassword('');
    setcpassword('');
  }

  const handleChange = async (e) => {
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
    }
    else if (e.target.name === 'Address') {
      setaddress(e.target.value);
    }
    else if (e.target.name === 'opassword') {
      setopassword(e.target.value);
    }
    else if (e.target.name === 'npassword') {
      setnpassword(e.target.value);
    }
    else if (e.target.name === 'cpassword') {
      setcpassword(e.target.value);
    }  
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push("/");
    }
    if (localStorage.getItem('email')) {
      let data = localStorage.getItem('email')
      setemail(data);
    }
    currentDetails();
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
      <p className='font-bold text-2xl text-center'>My Account</p>
      <p className=' mt-5 font-semibold text-lg'>1. Delivery Details:</p>
      <div className='flex flex-row  space-x-1  md:space-x-3'>
        <div className='flex flex-col w-[100vw]'>
          <label htmlFor='Name'>Name</label>
          <input onChange={handleChange} value={name} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Name" id="Name" type="text" placeholder='Enter the Name'></input>
        </div>
        <div className='flex flex-col w-[100vw]'>
          <label htmlFor='Email'>Email</label>
          {email != '' && <input onChange={handleChange} value={email} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Email" id="Email" type="Email" placeholder='Enter the Email' readOnly={true}></input>
          }
          {email == '' && <input onChange={handleChange} value={email} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Email" id="Email" type="Email" placeholder='Enter the Email'></input>
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
          <input onChange={handleChange} value={Pincode} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="Pincode" id="Pincode" type="text" placeholder='Enter Pincode'></input>

        </div>
      </div>
      <button onClick={handleDetailsChange} className="flex mt-5 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Change Details</button>
      <div><p className=' mt-5 font-semibold text-lg flex'>2. Change Your Password:</p>
        <div className='flex flex-row'>
          <div className='flex flex-col w-[100vw] m-2'>
            <label htmlFor='opassword'>Old Password</label>
            <input onChange={handleChange} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="opassword" id="opassword" type="password" placeholder='Old Password'></input>
          </div>
          <div className='flex flex-col w-[100vw] m-2'>
            <label htmlFor='npassword'>New Password</label>
            <input onChange={handleChange} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="npassword" id="npassword" type="password" placeholder='New Password'></input>
          </div>
          <div className='flex flex-col w-[100vw] m-2'>
            <label htmlFor='cpassword'>Confirm Password</label>
            <input onChange={handleChange} className="px-2 py-2 border-2 rounded-lg border-gray-400" name="cpassword" id="cpassword" type="password" placeholder='Confirm Password'></input>
          </div>
        </div>
        <button onClick={handlePasswordChange} className="flex mt-5 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Change Password</button>
      </div>
    </div>

  )
}

export default myaccount