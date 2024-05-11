import React from 'react'
import SearchBox from './SearchBox'
import Paramettre from './Paramettre'

function Navbar() {
  return (
    <nav className='flex items-center justify-between px-10 py-4 mt-4'>
        <div></div>

        <SearchBox />

        <Paramettre />
    </nav>
  )
}

export default Navbar