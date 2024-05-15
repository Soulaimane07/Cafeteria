import React from 'react'
import { CiTrash } from 'react-icons/ci';
import { BiEditAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
function Paiment() {
    const paiments = []
  return (
    <>
       <div className='w-full border-l-2   border-gray-100 min-h-svh'>
       <header className='w-5/6 mb-8 mx-20 justify-between flex text-center'>
                  <h1 className='text-2xl font-medium'> Paiments ({paiments?.length}) </h1>
                 
              </header>
              
              <div className=' px-20 text-center'>
            
  
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Id Client
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Id Order
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              {paiments.map((list,key)=>(<tr  class="bg-white border-b ">
                  <th  scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {list.id}
                  </th>
                  <td class="px-6 py-4">
                      {list.titre}
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

export default Paiment