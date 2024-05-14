import React from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Footer from '../../../Components/Footer/Footer'
import Plat from '../../../Components/Plat'
import { useSelector } from 'react-redux'

function Favorites() {
    const plats = useSelector(state => state.Favorits.plats)

  return (
    <>
          <main className='flex'>
              <Sidebar />
              <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                    <Navbar />
  
                    <section className='flex-1 rounded-md px-10 '>
                        <h1 className=' text-4xl font-medium'> Favorites </h1>

                        <div className='grid grid-cols-4 gap-6 mt-6'>
                            {plats?.map((item,key)=>(
                                <Plat plat={item.plat} fav={item._id} favorated={true} key={key} />
                            ))}
                        </div>
                    </section>
              </section>
          </main>
  
          <Footer />
      </>
  )
}

export default Favorites