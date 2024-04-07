import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='mb-0'><footer className="text-gray-600 body-font mb-0">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-80 flex-shrink-0  mx-auto text-center md:text-left ml-11">
        <a className="flex title-font font-medium items-center justify-center text-gray-900">
          <Image src="/OIG3.jpeg" alt="Codes_Threads" width={80} height={20}/>
        </a>
        <p className="mt-2 text-lg text-indigo-500 font-semibold">Learn & Wear the Code!</p>
      </div>
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-bold text-indigo-500 tracking-widest text-sm mb-3">PRODUCTS</h2>
          <nav className="list-none mb-10">
            <li>
              <a href="/stickers" className="text-gray-600 hover:text-gray-800">Stickers</a>
            </li>
            <li>
              <a href="/tshirts" className="text-gray-600 hover:text-gray-800">Tshirts</a>
            </li>
            <li>
              <a href="/hoodies" className="text-gray-600 hover:text-gray-800">Hoodies</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-bold text-indigo-500 tracking-widest text-sm mb-3">USER SECTION</h2>
          <nav className="list-none mb-10">
            <li>
              <a href="/myaccount" className="text-gray-600 hover:text-gray-800">My Account</a>
            </li>
            <li>
              <a href="/orders" className="text-gray-600 hover:text-gray-800">My Orders</a>
            </li>
            <li>
              <a href="/login" className="text-gray-600 hover:text-gray-800">Login</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-bold text-indigo-500 tracking-widest text-sm mb-3">UTILITIES</h2>
          <nav className="list-none mb-10">
          <li>
              <a href="/mugs" className="text-gray-600 hover:text-gray-800">Mugs</a>
            </li>
            <li>
              <a href="/about" className="text-gray-600 hover:text-gray-800">Contact Us</a>
            </li>
            <li>
              <a href="/checkout" className="text-gray-600 hover:text-gray-800">Shopping Cart</a>
            </li>
            </nav></div>
        </div>
    </div>
    <div className="bg-gray-100">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 codes_threads —
          <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@Sahdev Rajput</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <a href="https://www.instagram.com/sahdev_rajput_1095/" className="ml-3 text-gray-500">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a href='https://www.linkedin.com/in/sahdev-rajput-a22838253/' className="ml-3 text-gray-500">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </div>
  </footer></div>
  )
}

export default Footer