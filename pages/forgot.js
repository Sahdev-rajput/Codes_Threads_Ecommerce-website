import React from 'react'
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { setRequestMeta } from 'next/dist/server/request-meta';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const forgot = () => {
    const router=useRouter();
    const [email, setemail] = useState('')

    const handleChange=(e)=>{
        setemail(e.target.value);
    }
      
    const handleClick=async(e)=>{
        e.preventDefault();
        let submitData={email:email};
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`,{
            method: 'POST',
            body: JSON.stringify(submitData),
            headers: {
              'content-type': 'application/json'
            }
          })
        let data=await res.json();
        if(!data.Success)
        {
            toast.error('No user exists with the provided email.', {
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
        else{
        toast.success('You have been mailed with the link to reset the password.', {
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
        setemail('');
    }
    }

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
        <section className=" dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full md:mt-32 md:mb-32 lg:py-0">
      <a href="/index" className="flex items-center mb-6 text-2xl font-semibold text-indigo-500 dark:text-white">
          <img className="w-20 h-8 mr-2" src="/OIG3.jpeg" alt="logo"/>
          Codes Threads    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
        
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Email Address</label>
                      <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                
                  <button onClick={handleClick} type="submit" className="w-full text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Continue</button>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default forgot