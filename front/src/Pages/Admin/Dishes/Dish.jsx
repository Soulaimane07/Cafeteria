import React from 'react'
import { CiTrash } from 'react-icons/ci';
import { BiEditAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { GetDishes } from '../../../Components/Functions';

function Dish() {
  const Dishes = GetDishes()
  console.log(Dishes)
  return (
    
    <>
     <div className=' w-full border-2 border-gray-100 min-h-svh'>
     <header className='w-5/6 mb-8 mx-20 justify-between flex text-center'>
                <h1 className='text-2xl font-medium'> Dishes ({Dishes?.length}) </h1>
                <Link to={"/admin/adddish"} className='flex items-center px-6 border-2 bg-hoverPrimaryColor  border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all  rounded-sm py-2 space-x-1'> 
                    <IoAdd size={20} />
                    <p> Dish </p>
                </Link>
            </header>
            <div className=' px-20 text-center'>
          

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Dish name
                </th>
                <th scope="col" class="px-6 py-3">
                    description
                </th>
                <th scope="col" class="px-6 py-3">
                    prix
                </th>
                <th scope="col" class="px-6 py-3">
                    categorie id
                </th>
                <th scope="col" class="px-6 py-3">
                    day
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {Dishes.map((Dishe,key)=>(<tr  class="bg-white border-b ">
                <th  scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {Dishe.id}
                </th>
                <td class="px-6 py-4">
                    {Dishe.titre}
                </td>
                <td class="px-6 py-4">
                    {Dishe.description}
                </td>
                <td class="px-6 py-4">
                {Dishe.prix}
                </td>
                <td class="px-6 py-4">
                {Dishe.categorieId}
                </td>
                <td class="px-6 py-4">
                {Dishe.day}
                </td>
                <td class="px-6 py-4 ">
                <Link to={`/admin/editdish/${Dishe.id}`}>
                <button  className=' opacity-40 hover:opacity-100 hover:text-blue-600 transition-all mr-4 '>
                    <BiEditAlt size={25} />
                </button>
                </Link>
                <button   className=' opacity-40 hover:opacity-100 hover:text-red-600 transition-all '>
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

export default Dish