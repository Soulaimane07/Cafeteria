import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Footer from '../../../Components/Footer/Footer'
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar'

import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const Buttons = ({createFun, condittion}) => {
    return(
        <div className='flex space-x-2 items-stretch'>
        <Link to={'/admin/readTable'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
        <button 
            onClick={createFun} 
            disabled={condittion}
            className={`${condittion ? "opacity-40" : "opacity-100  bg-hoverPrimaryColor  border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white "} bg-hoverPrimaryColor text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
        > Create </button>
    </div>
    )
  }

function AddTables() {
    const navigate = useNavigate();
    const [id, setid] = useState('')
    const [capacite, setcapacite] = useState('')
    const [disponibilite, setDisponibilite] = useState('')
    const newTables = {
        id: id,
        capacite: capacite,
        Disponibilite: disponibilite,
    }

    let condittion = id.length === 0 || capacite.length === 0 || disponibilite.length === 0 


    console.log(newTables);

  return (
    <>
    <main className='flex'>
        <AdminSidebar />
        <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
            <AdminNavbar />

            <section className='flex-1 rounded-md px-10 mt-10'>
            <article className='flex-1'>
          <header className='w-full mb-6 px-8 justify-between flex text-center items-center'>
              <div className='flex space-x-3 text-gray-800 '>
              <Link to={"/admin/tables"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all py-2 space-x-1'> 
                      <FaArrowLeft size={20} />
                  </Link>
                  <h1 className='text-2xl font-medium text-gray-800'> Add New Table </h1>
              </div>
          </header>
          <main className='bg-gray-100 px-8 py-6 rounded-sm'>
              <div  className='bg-white px-6 py-6 rounded-sm '>
                  <div className='w-full flex items-stretch space-x-8'>
            

                      <div className='flex-1'>
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                  <label className=' font-medium text-gray-600'> Capacite </label>
                                  <input onChange={(e)=> setcapacite(e.target.value)} type='number' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Capacite' />
                              </div>
                          </div>
                        
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Disponibilite </label>
                                    <select onChange={(e)=> setDisponibilite(e.target.value)} className='border-2 px-4 py-2 rounded-sm mt-2'>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </select>
                              </div>
                          </div>
                         
                          

                        

                      </div>
                  </div>

                  <div className='flex justify-end mt-10'>
                      <Buttons condittion={condittion} />
                  </div>
              </div>
          </main>
      </article>
            </section>
        </section>
    </main>

    <Footer />
</>
  )
}

export default AddTables