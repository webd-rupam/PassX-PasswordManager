import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white sticky w-full top-0'>

      <div className='mycontainer flex justify-between items-center px-10 py-5 h-14'>


        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>X/&gt;</span>
        </div>

        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
          </li>
        </ul> */}

        <button className='text-white bg-green-700 my-3 rounded-lg flex justify-between items-center hover:bg-green-600 ring-1 ring-white'>
          <img className='invert p-1 w-8' src="/icons/github.svg" alt="github" />

          <span className=' hover:underline font-bold px-2'><a href="https://github.com/webd-rupam" target='_blank'>GitHub</a></span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
