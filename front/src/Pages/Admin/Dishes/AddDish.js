import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Footer from '../../../Components/Footer/Footer'
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar'

import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { GetCategories } from '../../../Components/Functions';
import axios from 'axios';
const Buttons = ({createFun, condittion}) => {
  return(
      <div className='flex space-x-2 items-stretch'>
      <Link to={'/admin/dishes'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
      <button 
          onClick={createFun} 
          disabled={condittion}
          className={`${condittion ? "opacity-40" : "opacity-100  bg-hoverPrimaryColor  border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white "} bg-hoverPrimaryColor text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
      > Create </button>
  </div>
  )  }

function AddDish() {
  const categories = GetCategories()
  const navigate = useNavigate();
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [prix, setPrix] = useState('')
  const [categorie, setCategorie] = useState(0)
  const [Day, setDay] = useState('')
  
  let newDish = {
    titre: titre,
    description:description,
    image:image,
    prix:Number(prix),
    categorieId:Number(categorie),
    day:Day
  }

  let condittion = !titre || !categorie || !image  || !description ||  !prix ||  !Day;

  console.log(newDish);

  const Create = (e) => {
    // e.preventDefault();
    console.log("hello")
     axios.post('http://localhost:3005/dishes/', newDish, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(res => {
            console.log(res);
            navigate("/admin/dishes")
        })
        .catch(err => {
            console.log(err);
        })
}

  

  
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
            <Link to={"/admin/dishes"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all py-2 space-x-1'> 
                    <FaArrowLeft size={20} />
                </Link>
                <h1 className='text-2xl font-medium text-gray-800'> Add New Dish </h1>
            </div>
        </header>
        
        <main className='bg-gray-100 px-8 py-6 rounded-sm'>
                <div  className='bg-white px-6 py-6 rounded-sm '>
                    <div className='w-full flex items-stretch space-x-8'>
                        <div className="w-2/5 flex items-center justify-center">
                            <label htmlFor="dropzone-file" className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input onChange={(e)=> setImage(e.target.files[0])} id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" />
                            </label>
                        </div> 

                        <div className='flex-1'>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Dish Name </label>
                                    <input onChange={(e)=> setTitre(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Dish Name' />
                                </div>
                            </div>
                            <div className='flex-1 py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Category </label>
                                    <select onChange={(e)=> setCategorie(e.target.value)} className='border-2 px-4 py-2 rounded-sm mt-2 '>
                                        <option className=''> Select Category </option>
                                        {categories?.map((item,key)=>(
                                            <option value={item.id} key={key} className='border-2 px-4 py-2 rounded-sm mt-2'> {item.titre} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Price </label>
                                    <input onChange={(e)=> setPrix(e.target.value)} type='number' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Price' />
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> description </label>
                                    <input type='text' onChange={(e)=>setDescription(e.target.value)}  className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='description' />
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Day </label>
                                    <input type='text' onChange={(e)=>setDay(e.target.value)}  className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Day' />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex justify-end mt-10'>
                        <Buttons condittion={condittion}  createFun={Create} />
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

export default AddDish