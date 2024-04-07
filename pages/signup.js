import React,{useState} from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';
import { useEffect } from 'react';

const signup = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const router=useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitData = {name,email,password}
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
            method: 'POST',
            body: JSON.stringify(submitData),
            headers: {
              'content-type': 'application/json'
            }
          })
          const data=await res.json();
          if(data.Success){
            toast.success('You have successfully Signed Up.', {
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
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login/`)
                setname('')
                setemail('')
          }else{
            toast.error('Unknown Error, Contact the Administrator!', {
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
        } catch (error) {
            console.log(error)
        }
        setpassword('')
      }

    const handleChange=(e)=>{
        if(e.target.name=='name'){
           setname(e.target.value);
        }
        if(e.target.name=='email'){
            setemail(e.target.value);
        }
        if(e.target.name=='password'){
            setpassword(e.target.value)
        }
    }

    
    useEffect(() => {
      if(localStorage.getItem('token'))
      {
        router.push("/");
      }
    }, [])
    
  return (
    <div>
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
         <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/index" className="flex items-center mb-6 text-2xl font-semibold text-indigo-500 dark:text-white">
          <img className="w-20 h-8 mr-2" src="/OIG3.jpeg" alt="logo"/>
          Codes Threads    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 or <a href="/login" className=" text-primary-800 hover:underline dark:text-primary-600">Login into your Account</a>
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input onChange={handleChange} value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fname lname" required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email Address</label>
                      <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" className="w-full text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Create an Account</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default signup