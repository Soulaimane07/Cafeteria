import React, { useState } from 'react'
import Auth from './Auth'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../../Components/Variables'
import { LoadingBtn } from '../../Components/Buttons'
import { PageTitle } from '../../Components/Functions'
import { UserActions } from '../../Redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'

function Signup() {
   PageTitle('Cafeteria | Register')

    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [pass, setPass] = useState('')


    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const SignupFun = (event) => {
        event.preventDefault();
        setLoading(true)

        fetch(`${serverUrl}/users/`, 
            {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, fname, lname, pass})
          }
        )
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                dispatch(UserActions.login(data.data))
                navigate('/')
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }

  return (
    <main className='flex h-screen overflow-hidden items-center'>
        <Auth />
        <section className='w-1/2 px-32'>
            <img src="../images/logo.jpg" className='w-52 mx-auto' alt='logo' />

            <form onSubmit={SignupFun} className="">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Email Adress</label>
                    <input type="email" onChange={(e)=> setEmail(e.target.value)}  id="email" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-800">First Name</label>
                    <input type="text" onChange={(e)=> setFname(e.target.value)} id="fname" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-800">Last Name</label>
                    <input type="text" onChange={(e)=> setLname(e.target.value)} id="lname" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                    <input type="password" onChange={(e)=> setPass(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <LoadingBtn text="Register Now" loading={loading} />
            </form>

            <div className='flex space-x-2 mt-8 text-center justify-center' >
                <h2> Already have an account?  </h2>
                <Link to="/login" className="text-primaryColor transition-all"> Login </Link>
            </div>
        </section>
    </main>
  )
}

export default Signup