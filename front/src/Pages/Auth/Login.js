import React, { useState } from 'react'
import Auth from './Auth'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingBtn } from '../../Components/Buttons'
import { serverUrl } from '../../Components/Variables'
import { PageTitle } from '../../Components/Functions'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../Redux/Slices/UserSlice'

function Login() {
    PageTitle('Cafeteria | Login')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    
    const [loading, setLoading] = useState('')

    const LoginFun = (event) => {
        event.preventDefault();
        setLoading(true)

        fetch(`${serverUrl}/users/login`, 
            {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, pass})
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
        <section className='w-1/2 px-32'>
            <img src="../images/logo.jpg" className='w-52 mx-auto' />

            <h1 className=' text-gray-800 uppercase font-bold text-xl text-left'> Welcome </h1>

            <form onSubmit={LoginFun} className="mt-6">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Email Adress</label>
                    <input type="email" onChange={(e)=> setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                    <input type="password" onChange={(e)=> setPass(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-800 dark:text-gray-300">Remember me</label>
                </div>
                <LoadingBtn text="Login" loading={loading} />
            </form>

            <div className='flex space-x-2 mt-8 text-center justify-center' >
                <h2> Don't have an account?  </h2>
                <Link to={"/register"} className='text-primaryColor transition-all'> Register Here </Link>
            </div>
        </section>
        <Auth />
    </main>
  )
}

export default Login