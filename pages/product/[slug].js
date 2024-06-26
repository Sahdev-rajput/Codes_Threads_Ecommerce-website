import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Product from '@/models/Product';
import mongoose from 'mongoose';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'


const Slug = ({ error,Buy_Now, Add_to_cart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState()
  const [service, setservice] = useState();
  const [outofStock, setoutofStock] = useState(false)
  async function handleClick() {
    let pinjson = await fetch("http://localhost:3000/api/service");
    let pins = await pinjson.json();
    if (Object.keys(pins).includes(pin)) {
      toast.success('Yeah! We can Deliver to your Location', {
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
      setservice(true);
    }
    else {
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
      setservice(false)
    }
  }
  const handleChange = (e) => {
    setpin(e.target.value);
  }
  const [size, setsize] = useState(product.size)
  const [color, setcolor] = useState(product.color)
  useEffect(() => {
     if (error==404) {
    return <Error statusCode={error} />
  }
    if (product.availableQty == 0) {
      setoutofStock(true);
    }
  }, [])

  useEffect(() => {
    let url = `http://localhost:3000/product/${variants[color][size]['slug']}`;
    router.push(url);
}, [color]);


  return (
    <div>
      <ToastContainer position="top-center"
        autoClose={3000}
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
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="md:w-1/2 md:h-auto object-cover object-center rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Codes Threads</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) && (
                    <button
                      onClick={() => setcolor("red")}
                      className={`border-2 ${color === 'red' ? 'border-gray-950' : 'border-red-700'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                  {Object.keys(variants).includes("pink") && Object.keys(variants["pink"]).includes(size) && (
                    <button
                      onClick={() => setcolor("pink")}
                      className={`border-2 ${color === 'pink' ? 'border-gray-950' : 'border-pink-700'} ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                  {Object.keys(variants).includes("green") && Object.keys(variants["green"]).includes(size) && (
                    <button
                      onClick={() => setcolor("green")}
                      className={`border-2 ${color === 'green' ? 'border-gray-950' : 'border-green-700'} ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                  {Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size) && (
                    <button
                      onClick={() => setcolor("blue")}
                      className={`border-2 ${color === 'blue' ? 'border-gray-950' : 'border-blue-700'} ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                  {Object.keys(variants).includes("black") && Object.keys(variants["black"]).includes(size) && (
                    <button
                      onClick={() => setcolor("black")}
                      className={`border-2 bg-gray-950 ml-1 ${color === 'black' ? 'border-gray-200' : 'border-gray-500'} rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                  {Object.keys(variants).includes("yellow") && Object.keys(variants["yellow"]).includes(size) && (
                    <button
                      onClick={() => setcolor("yellow")}
                      className={`border-2 bg-yellow-300 ml-1 ${color === 'yellow' ? 'border-gray-950' : 'border-yellow-300'} rounded-full w-6 h-6 focus:outline-none`}
                    ></button>
                  )}

                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => setsize(e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants).map((color) => {
                        const sizes = Object.keys(variants[color]);
                        return sizes;
                      }).flat().reduce((acc, size) => {
                        if (!acc.includes(size)) {
                          acc.push(size);
                        }
                        return acc;
                      }, []).map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {outofStock && <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span>
                }
                {!outofStock && <span className="title-font font-medium text-2xl text-gray-900">₹ {product.price}</span>
                }
                <button disabled={outofStock} onClick={() => Buy_Now(variants[color][size], product.price, 1, product.title, color, size)} className="flex ml-8 md:ml-16 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-1 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                <button disabled={outofStock} onClick={() => {
                  toast.success('Product added to cart!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                    // Add any additional options here
                  });
                  Add_to_cart(variants[color][size], product.price, 1, product.title, color, size);
                }} className="flex ml-4 md:ml-8 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-1 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-row mt-4">
                <input onChange={handleChange} type="text" className='bg-gray-100 rounded-md px-1 py-1 border border-gray' />
                <button disabled={outofStock} onClick={handleClick} className="flex ml-10 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>

              </div>
              {
                !service && service != null && <div className='text-red-500'><p>Sorry! We do not deliever at your residence currently.</p></div>
              }
              {
                service && service != null && <div className='text-green-500'><p>Yay! We can deliever at your location.</p></div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


export const getServerSideProps = async (context) => {
  let error=null;
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if(product==null)
  {
    return {error:error };
  }
  let variants = await Product.find({ title: product.title })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }
  return { props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) } };
};


export default Slug