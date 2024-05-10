import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Footer from '../../../Components/Footer/Footer'
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar'  
import Reservations from './Reservations'

function ReadReservations() {
  return (
    <>
    <main className='flex'>
        <AdminSidebar />
        <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
            <AdminNavbar />

            <section className='flex-1 rounded-md px-10 mt-10'>
               
      <Reservations />
            </section>
        </section>
    </main>

    <Footer />
</>
  )
}

export default ReadReservations