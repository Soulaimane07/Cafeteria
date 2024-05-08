import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";


function Sidebar() {
    const links = [
        {
            "title": "Home",
            "link": "/",
            "icon": <GoHome />
        },
        {
            "title": "Food Order",
            "link": "/order",
            "icon": <IoCartOutline />
        },
        {
            "title": "Favorite Menu",
            "link": "/favorite",
            "icon": <GrFavorite />
        },
        {
            "title": "Bill",
            "link": "/bill",
            "icon": <RiBillLine />
        },
        {
            "title": "Restaurant",
            "link": "/restaurant",
            "icon": <IoRestaurantOutline />
        },
        {
            "title": "Setting",
            "link": "/setting",
            "icon": <IoSettingsOutline />
        },
    ]

  return (
    <section className=' w-1/5 px-10 py-10'>
        <Link to={'/'} className="flex justify-center">
            <img src="../images/logo.jpg" className='w-40' />
        </Link>

        <ul className='flex flex-col space-y-3 mt-6'>
            {links.map((item,key)=>(
                <NavLink
                    key={key}
                    to={item.link}
                    className={({ isActive }) =>
                        isActive ? " border-l-2 transition-all text-hoverPrimaryColor border-primaryColor px-4" : "px-4 border-l-2 border-transparent transition-all hover:text-primaryColor"
                    }  
                >
                    <div className='flex items-center space-x-2 py-1 my-1'>
                        {item.icon}
                        <p>{item.title}</p>
                    </div>  
                </NavLink>
            ))}
        </ul>
    </section>
  )
}

export default Sidebar