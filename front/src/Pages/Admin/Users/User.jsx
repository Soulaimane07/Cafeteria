import React from 'react'

import { CiTrash } from 'react-icons/ci';
import { BiEditAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { GetUsers, Removeuser } from '../../../Components/Functions';


function User() {
   
    const users = GetUsers()
 
    console.log(users)
    
  return (
    
    <>
     <div className='w-full border-l-2   border-gray-100 min-h-svh'>
     <header className='w-5/6 mb-8 mx-20 justify-between flex text-center'>
                <h1 className='text-2xl font-medium'> Users ({users?.length}) </h1>
                <Link to={"/admin/adduser"} className='flex items-center px-6 border-2 bg-hoverPrimaryColor  border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all  rounded-sm py-2 space-x-1'> 
                    <IoAdd size={20} />
                    <p> User </p>
                </Link>
            </header>
            
            <div className=' px-20 text-center'>
          

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
             
                <th scope="col" class="px-6 py-3">
                    Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                    First Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,key)=>(<tr  class="bg-white border-b ">
               
                <td class="px-6 py-4">
                    {user.lname}
                </td>
                <td class="px-6 py-4">
                {user.fname}
                </td>
                <td class="px-6 py-4">
                {user.email}
                </td>
                <td class="px-6 py-4">
                {user.role}
                </td>
                <td class="px-6 py-4 ">
                <Link to={`/admin/edituser/${user.id}`}>
                <button  className=' opacity-40 hover:opacity-100 hover:text-blue-600 transition-all mr-4 '>
                    <BiEditAlt size={25} />
                </button>
                </Link>
                <button onClick={()=>Removeuser(user.id)}  className=' opacity-40 hover:opacity-100 hover:text-red-600 transition-all '>
                    <CiTrash size={25} />
                </button>
                </td>
                
            </tr>))}
            
        </tbody>
    </table>
</div>

            </div>
        </div>
    </>
    
  )
}

export default User