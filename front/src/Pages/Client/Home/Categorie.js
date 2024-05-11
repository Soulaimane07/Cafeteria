import React from 'react'
import { GetCategories } from '../../../Components/Functions'
import {serverUrl} from '../../../Components/Variables'
import {Link} from 'react-router-dom'

function Categorie() {
  let categorieslist = GetCategories()

  return (
    <div className='mt-10'>
        <Link to={'/categories'} className='Link relative text-gray-800 font-bold mb-6 flex space-x-2 items-end'> 
          <h1 className='text-2xl'> Categories </h1>
          <p>See more ...</p>
        </Link>

        <div className='flex space-x-6'>
          {categorieslist?.map((item,key)=>(
              key < 10 &&(
                <Link to={`/categories/${item._id}`} key={key}> 
                  <div className=' bg-white p-6 rounded-full hover:bg-primaryColor transition-all'> 
                    <img className='w-12' src={`${serverUrl}/${item.image}`} alt={item.image} />
                  </div>
                  <h1 className='text-center mt-2 font-medium'> {item.titre} </h1> 
                </Link>
              )
          ))}
        </div>
    </div>
  )
}

export default Categorie