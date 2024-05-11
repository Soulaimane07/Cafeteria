import React from 'react'
import { serverUrl } from './Variables'
import OrderButton from './Buttons/OrderButton'
import FavoriteButton from './Buttons/FavoriteButton'
import { IsFavorated } from './Functions'

function Plat({plat, fav, favorated, user}) {
  let isFavorated =  IsFavorated(plat?._id, user)

  return (
    <div> 
        <div className=' bg-white p-6 rounded-md hover:bg-primaryColor transition-all'> 
            <img className='w-28 mx-auto' src={`${serverUrl}/${plat.image}`} alt={plat.image} />
            <div className='flex items-center justify-between mb-2 mt-2'>
                <h1 className='text-center mt-2 font-medium'> {plat.titre} </h1> 
                <FavoriteButton plat={plat} fav={fav ?? isFavorated?._id} favorated={favorated ?? isFavorated?._id} />
            </div>
            <p className=' opacity-60'> {plat.description.substring(0, 60)} </p>

            <div className='flex items-center justify-between mt-4'>
                <p className='font-medium text-xl'> ${plat.prix} </p>
                <OrderButton plat={plat} />
            </div>
        </div>
    </div>
  )
}

export default Plat