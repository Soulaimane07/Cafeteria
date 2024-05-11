import React from 'react'
import { Link } from 'react-router-dom'
import { GetPlats } from '../../../Components/Functions'
import Plat from '../../../Components/Plat';
import { useSelector } from 'react-redux';

function Plats() {
  let plats = GetPlats()
  let userId = useSelector(state=> state.User.data?._id)


  return (
    <div className='mt-14 mb-20'>
        <Link to={'/plats'} className='Link Plats relative text-gray-800 font-bold mb-6 flex space-x-2 items-end'> 
          <h1 className='text-2xl'> Plats </h1>
          <p>See more ...</p>
        </Link>

        <div className='grid grid-cols-4 gap-5'>
          {plats?.map((item,key)=>(
            <Plat plat={item} key={key} user={userId} />
          ))}
        </div>
    </div>
  )
}

export default Plats