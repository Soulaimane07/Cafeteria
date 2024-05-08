import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

function Header() {
  return (
    <div className=' bg-greenn text-white rounded-md py-6 pl-10 flex justify-between items-center'>
        <div>
            <h1 className='text-4xl font-medium mb-2'> All Best recipes in one place </h1>
            <p className='text-2xl font-light mb-6'> Upload your own home-made recipe. </p>
            <button className='flex items-center bg-green-400 px-10 py-3 rounded-md mt-4 space-x-1'> 
                <p> Order now </p>
                <IoCartOutline size={20} /> 
            </button>
        </div>
        <img src="../images/header.png" />
    </div>
  )
}

export default Header