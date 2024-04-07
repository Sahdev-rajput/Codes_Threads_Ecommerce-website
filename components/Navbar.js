import React,{useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from 'next/router';

const Navbar = ({Logout,user,cart,addQuantity,minusQuantity,Add_to_cart,Clear_the_Cart,TotalAmount}) => {
    const [sbvisible, setsbvisible] = useState(false);
    const [dropvisible, setdropvisible] = useState(false)
    const router=useRouter()
    const toggleSidebar=()=>{
        if(!sbvisible)
        {
            setdropvisible(false);
        }
        setsbvisible(!sbvisible);
    }
    const toggleDrop=()=>{
        setdropvisible(!dropvisible);
    }
    
    return (
        <div className='z-10'>
            <nav className="flex flex-col md:flex-row md:flex-wrap my-4 shadow-sm">
                <div className="mx-auto md:mx-3 mb-2">
                    <Link href={"/"}><Image src="/OIG3.jpeg" alt="Codes_threads" width={80} height={20} className="border border-white-500"/></Link>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start my-1 md:mx-3 w-full md:w-auto">
                    <ul className="flex flex-row space-x-3 text-sm md:text-md md:space-x-5 font-semibold">
                        <li><Link href={"/about"}>About</Link></li>
                        <li><Link href={"/stickers"}>Stickers</Link></li>
                        <li><Link href={"/tshirts"}>T-Shirts</Link></li>
                        <li><Link href={"/hoodies"}>Hoodies</Link></li>
                        <li><Link href={"/mugs"}>Mugs</Link></li>
                    </ul>
                </div>
                {dropvisible && <div className='absolute bg-white top-12  cursor-pointer w-36 border border-indigo-400 rounded-md right-10 z-20'>
                    <ul>
                        <Link href="/myaccount"><li className='py-1 px-2  cursor-pointer  font-semibold hover:text-indigo-600'>My Account</li></Link>
                        <Link href="/orders"><li className='py-1 px-2  cursor-pointer font-semibold hover:text-indigo-600'>My Orders</li></Link>
                        <li onClick={()=>Logout()} className='py-1 px-2 cursor-pointer  font-semibold hover:text-indigo-600'>Logout</li>
                    </ul>
                </div>}
                <div className="m-auto my-1 absolute right-3 top-3 items-center flex flex-row">
                    {!user.value && <Link href={"/login"}><button className='bg-indigo-500 text-white mx-2 rounded-md py-2 text-sm px-3'>Login</button></Link>}
                    {user.value && <RiAccountCircleFill onClick={toggleDrop} className='text-indigo-500 items-center mr-2 text-2xl cursor-pointer'/>}
                    <FaCartShopping onClick={toggleSidebar} className="cursor-pointer items-center w-6 h-6 text-indigo-500"/>
                </div>
                {
                    sbvisible && 
                <div className='w-52 md:w-72 overflow-y-scroll rounded-lg bg-indigo-50 h-[100vh] absolute top-2 right-1 px-6 py-8 z-20'>
                <IoIosCloseCircle onClick={toggleSidebar} className='text-indigo-500 text-3xl absolute right-2 top-2'/>
                <p className='mt-5 font-bold text-center'>Shopping Cart</p>
                <ol className='list-decimal mt-5'>
                {
                    cart.map((item,index)=>(
                        <li key={item.itemCode} className='flex flex-row mt-3'>{item.title}({item.variant}/{item.size})<FaMinusCircle onClick={() => minusQuantity(item.itemCode)} className='ml-2 mt-1'/><span className='ml-1'>{item.qty}</span><FaPlusCircle onClick={() => addQuantity(item.itemCode)} className='ml-1 mt-1'/></li>
                    ))
                }
            </ol>
            {
                TotalAmount!=0 &&  <p className='mt-5 text-center font-semibold text-md'>Net Amount: {TotalAmount}</p>
            }
                <div className='flex flex-row mt-5'>
                <Link href="/checkout"><button disabled={cart.length===0} className="flex md:ml-3 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Checkout</button></Link>
                <button disabled={cart.length===0} onClick={Clear_the_Cart} className="flex ml-6 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Clearall</button>
            </div>
            </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;
