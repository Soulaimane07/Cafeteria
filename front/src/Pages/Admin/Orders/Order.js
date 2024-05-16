import React from 'react'
import { CiTrash } from 'react-icons/ci';
import { BiEditAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { GetOrders } from '../../../Components/Functions';
function Order() {
    const orders = GetOrders()
 console.log(orders)
    
    
    return (
      
      <>
       <div className='w-full border-l-2   border-gray-100 min-h-svh'>
       <header className='w-5/6 mb-8 mx-20 justify-between flex text-center'>
                  <h1 className='text-2xl font-medium'> Orders ({orders?.length}) </h1>
                 
              </header>
              
              <div className=' px-20 text-center'>
            
  
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                  <th scope="col" class="px-6 text-left py-3">
                     Client
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Id Dish
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              {orders.map((list,key)=>(<tr  class="bg-white border-b ">
                  <td class="px-6 text-left py-4">
                      {list.user.email}
                  </td>
                  <td class="px-6 py-4">
                      {list.plat.titre}
                  </td>
                  <td class="px-6 py-4">
                      {list.plat.prix}
                  </td>
                 
                  <td class="px-6 py-4 ">
                  <button  className=' opacity-40 hover:opacity-100 hover:text-red-600 transition-all '>
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

export default Order