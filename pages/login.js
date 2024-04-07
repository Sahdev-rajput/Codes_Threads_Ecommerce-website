import React, { useState } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';
import { useEffect } from 'react';

const login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const router = useRouter();
    var jwt = require('jsonwebtoken');
    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitData = { email, password }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const data=await res.json();
            if (data.Success) {
                localStorage.setItem('token',data.token);
                toast.success('You are getting log in.', {
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
                setTimeout(() => {
                    router.push("/")
                }, 2000);
                setemail('')
                setpassword('')
            } else {
                toast.error('Invalid Credentials!', {
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
    }

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setemail(e.target.value);
        }
        if (e.target.name == 'password') {
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
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-indigo-500 dark:text-white">
                        <img className="w-20 h-8 mr-2" src="/OIG3.jpeg" alt="logo" />
                        Codes Threads
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                                    <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Sign in</button>
                                <p className="text-sm text-center font-light text-gray-600 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/signup" className="font-medium text-primary-800 hover:underline dark:text-primary-600">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default login