import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from './Header'
import Categorie from './Categorie'
import { PageTitle } from '../../Components/Functions'

function Home() {
  PageTitle('Cafeteria | Home')

  return (
    <>
        <main className='flex'>
            <Sidebar />
            <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                <Navbar />

                <section className='flex-1 rounded-md px-10 mt-4'>
                    <Header />
                    <Categorie />
                </section>
            </section>
        </main>

        <Footer />
    </>
  )
}

export default Home