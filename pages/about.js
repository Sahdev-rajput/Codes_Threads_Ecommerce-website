import React from 'react'

const about = () => {
  return (
    <div classNameName='px-14 py-4'>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img alt="content" className="object-cover object-center h-full w-full" src="/photo-1580894912989-0bc892f4efd0.jpeg"/>
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Sahdev Rajput</h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <p className="text-base">Software Engineer</p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p className="leading-relaxed text-lg mb-4">Codes_threads is an innovative website crafted by Sahdev Rajput, specializing in offering a diverse range of coding-themed accessories such as t-shirts, hoodies, mugs, and stickers. As part of a visionary project, this platform caters to tech enthusiasts and coders alike, providing a unique space to celebrate programming culture through stylish and functional merchandise. Powered by NEXTJS, Codes_threads delivers a seamless user experience, combining creativity with cutting-edge web technology. Whether you're looking to express your passion for coding or seeking the perfect gift for a fellow developer, Codes_threads is your go-to destination. Explore their curated collection of designs that blend aesthetics with programming humor, and embrace your coding journey with flair. Experience the fusion of fashion and technology at Codes_threads, where every item is crafted with a coder's spirit in mind.</p>
          <a className="text-indigo-500 inline-flex items-center cursor-pointer" href="/">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default about