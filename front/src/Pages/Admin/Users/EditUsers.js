import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useParams,useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Footer from '../../../Components/Footer/Footer'
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar'

const Buttons = ({createFun, condittion}) => {
    return(
        <div className='flex space-x-2 items-stretch'>
            <Link to={'/admin/Users'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
            <button 
                onClick={createFun} 
                disabled={condittion}
                className={`${condittion ? "opacity-40" : "opacity-100  bg-hoverPrimaryColor  border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white "} bg-hoverPrimaryColor text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
            > Update </button>
        </div>
    )
  }

function EditUsers() {
    let { id } = useParams();
    const navigate = useNavigate();
    const user = {"id":1,"lname":"last","fname":"pilot","email":"hamza@gmail.com","password":"123456","role":"client"}
   console.log(user)
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    useEffect(()=>{
      if (user){
      setLastname(user.lname)
      setFirstname(user.fname)
      setEmail(user.email)
      setPassword(user.password)
  }},[user])
    
    const newUserData = {
        lname: lastname,
        fname: firstname,
        email: email,
        password: password,
        
    }
  
    let condittion = !lastname || !firstname || !email || !password; 
  
  
  return (
    <>
    <main className='flex'>
        <AdminSidebar />
        <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
            <AdminNavbar />

            <section className='flex-1 rounded-md px-10 mt-10'>
               
            <header className='w-full mb-6 px-8 justify-between flex text-center items-center'>
            <div className='flex space-x-3 text-gray-800 '>
            <Link to={"/admin/Users"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-hoverPrimaryColor hover:text-hoverPrimaryColor hover:bg-white transition-all py-2 space-x-1'> 
                      <FaArrowLeft size={20} />
                  </Link>
                <h1 className='text-2xl font-medium text-gray-800'> Update User </h1>
            </div>
        </header>
        <main className='bg-gray-100 px-8 py-6 rounded-sm'>
            <div  className='bg-white px-6 py-6 rounded-sm '>
                <div className='w-full flex items-stretch space-x-8'>
          

                    <div className='flex-1'>
                        <div className='py-2'>
                            <div className='flex flex-col'>
                                <label className=' font-medium text-gray-600'> First Name </label>
                                <input value={firstname} onChange={(e)=> setFirstname(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='First Name' />
                            </div>
                        </div>
                      
                        <div className='py-2'>
                            <div className='flex flex-col'>
                                <label className=' font-medium text-gray-600'> Last Name </label>
                                <input value={lastname} onChange={(e)=> setLastname(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Last Name' />
                            </div>
                        </div>
                        <div className='py-2'>
                            <div className='flex flex-col'>
                                <label className=' font-medium text-gray-600'> Email </label>
                                <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Email' />
                            </div>
                        </div>
                        <div className='py-2'>
                            <div className='flex flex-col'>
                                <label className=' font-medium text-gray-600'> Password </label>
                                <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Password' />
                            </div>
                        </div>

                      

                    </div>
                </div>

                <div className='flex justify-end mt-10'>
                    <Buttons condittion={condittion}  />
                </div>
            </div>
        </main>
            </section>
        </section>
    </main>

    <Footer />
</>
  )
}

export default EditUsers