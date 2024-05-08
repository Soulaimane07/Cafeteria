import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../Redux/Slices/UserSlice';

function Paramettre() {
  const user = useSelector(state => state.User.data)

  const [hover, setHover] = useState(false)


  const dispatch = useDispatch()

  const logout = () => {
    dispatch(UserActions.logout())
  }

  return (
    <div className='flex space-x-2 items-center'>
      <button 
        onMouseEnter={()=> setHover(true)}
        onMouseLeave={()=> setHover(false)}
        className='flex space-x-2 items-center'
      >
        <div className='bg-green-300 text-white p-2 rounded-full'> <CiUser size={30} /> </div>
      </button>

      {hover &&
        <div 
          onMouseLeave={()=> setHover(false)}
          onMouseEnter={()=> setHover(true)}
          className=' absolute top-20 right-10 bg-white rounded-sm w-fit px-6 py-4'
        >
          <div className=''>
            <div className='flex justify-between items-center'>
              <p className=' text-left font-medium'> {user.fname} {user.lname} </p>
            </div>
            <p className=' text-left font-medium'> {user.email} </p>
            <p className=' text-left font-light text-sm'> User </p>
          </div>
          <button onClick={logout} className='mt-2 bg-primaryColor w-full text-white py-2 rounded-md'> Log out </button>
        </div>
      }
    </div>
  )
}

export default Paramettre