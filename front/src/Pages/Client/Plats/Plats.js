import React from 'react'
import { GetPlats } from '../../../Components/Functions'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Plat from '../../../Components/Plat'
import { useSelector } from 'react-redux'

function Plats() {
    let userId = useSelector(state=> state.User.data?._id)
    let platslist = GetPlats()

    return (
      <>
          <main className='flex'>
              <Sidebar />
              <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                    <Navbar />
  
                    <section className='flex-1 rounded-md px-10 '>
                        <h1 className=' text-4xl font-medium'> Plats </h1>

                        <div className='grid grid-cols-4 gap-6 mt-6'>
                            {platslist?.map((item,key)=>(
                                <Plat plat={item} key={key} user={userId} />
                            ))}
                        </div>
                    </section>
              </section>
          </main>
  
          <Footer />
      </>
    )
}

export default Plats