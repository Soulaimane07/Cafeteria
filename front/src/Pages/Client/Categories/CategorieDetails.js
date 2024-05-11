import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { GetCategorie } from '../../../Components/Functions'

function CategorieDetails() {
    const {categorieId} = useParams()

    let categorie = GetCategorie(categorieId)

  return (
    <>
        <main className='flex'>
            <Sidebar />
            <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                <Navbar />

                <section className='flex-1 rounded-md px-10 mt-4 grid grid-cols-5 gap-6'>
                    <h1 className=' text-4xl font-medium'> {categorie.titre} </h1>
                </section>
            </section>
        </main>

        <Footer />
    </>
  )
}

export default CategorieDetails