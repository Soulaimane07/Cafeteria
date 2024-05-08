import React, { useState } from 'react'
import { RiSearch2Line } from "react-icons/ri";

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='flex items-center space-x-2 bg-white text-gray-600 rounded-md overflow-hidden px-4 w-1/3'>
        <span className='text-gray-600'>
          <RiSearch2Line />
        </span>
        <input 
            type='search'
            placeholder='Search'
            className='py-1.5 px-2 bg-transparent flex-1 outline-none'
            onChange={(e)=> setSearchTerm(e.target.value)}
        />
    </div>
  )
}

export default SearchBox