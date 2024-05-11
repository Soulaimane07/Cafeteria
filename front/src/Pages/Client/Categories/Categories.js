import React from 'react'
import Footer from '../../../Components/Footer/Footer'
import { GetCategories } from '../../../Components/Functions'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../../Components/Variables'
import Navbar from '../../../Components/Navbar/Navbar'
import Sidebar from '../../../Components/Sidebar/Sidebar'

function Categories() {
  let categorieslist = GetCategories()

  return (
    <>
        <main className='flex'>
            <Sidebar />
            <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                <Navbar />

                <section className='flex-1 rounded-md px-10 '>
                    <h1 className=' text-4xl font-medium'> Categories </h1>

                    <div className='grid grid-cols-5 gap-6 mt-6'>
                        {categorieslist?.map((item,key)=>(
                            <Link to={`/categories/${item._id}`} key={key}> 
                                <div className=' bg-white hover:bg-primaryColor hover:text-white transition-all py-4 pt-8 rounded-md'> 
                                    <img className='w-20 mx-auto' src={`${serverUrl}/${item.image}`} alt={item.image} />
                                    <h1 className='text-center font-medium mt-6'> {item.titre} </h1> 
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </section>
        </main>

        <Footer />
    </>
  )
}

export default Categories