import React from 'react';
import mongoose from 'mongoose';
import Product from '@/models/Product';

const Tshirts = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 md:px-20 py-1 md:py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((item, index) => {
            return (
              <div key={index} className="lg:w-1/4 mx-auto p-2 shadow-md my-4">
                <a href={`/product/${products[item].slug}`} className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="h-80 w-54 mx-auto my-auto" src={products[item].img} /> {/* Added mx-auto and my-auto classes */}
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹ {products[item].price}</p>
                </div>
                <div className='mt-2'>
                  {products[item].size.includes('S') && <span className='border border-gray-500 rounded m-1 p-1'>S</span>}
                  {products[item].size.includes('M') && <span className='border border-gray-500 rounded m-1 p-1'>M</span>}
                  {products[item].size.includes('L') && <span className='border border-gray-500 rounded m-1 p-1'>L</span>}
                  {products[item].size.includes('XL') && <span className='border border-gray-500 rounded m-1 p-1'>XL</span>}
                  {products[item].size.includes('XXL') && <span className='border border-gray-500 rounded m-1 p-1'>XXL</span>}
                </div>

                <div className='mt-2'>
                  {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                  {products[item].color.includes('aqua') && <button className="border-2 border-gray-300 ml-1 bg-aqua-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: "Cotton"});
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color);
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size);
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return { props: { products: JSON.parse(JSON.stringify(tshirts)) } };
};

export default Tshirts;
