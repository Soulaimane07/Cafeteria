import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

import { RiBillLine } from "react-icons/ri";
import { IoRestaurantOutline } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";

function Sidebar() {
    const links = [
        {
            "title": "Dashboard",
            "link": "../../admin/dashboard",
            "icon": <GoHome />
        },
        {
            "title": "Users",
            "link": "../../admin/users",
            "icon": <FaRegUser />
        },
        {
            "title": "Dishes",
            "link": "../../admin/dishes",
            "icon": <IoRestaurantOutline />
        },
        {
            "title": "Categories",
            "link": "../../admin/Categories",
            "icon":<BiCategory />
        },
        {
            "title": "Tables",
            "link": "../../admin/tables",
            "icon": <MdOutlineTableBar />
        },
        {
            "title": "Reservations",
            "link": "../../admin/reservations",
            "icon": <RiBillLine />
        },
        { 
            "title": "Orders",
            "link": "../../admin/orders",
            "icon": <IoCartOutline />
        },
        {
            "title": "Paiments",
            "link": "../../admin/paiments",
            "icon": <MdAttachMoney />
        },
     
    ]

  return (
    <section className=' w-1/5 px-10 py-10'>
        <Link to={'/'} className="flex justify-center">
            <img src="../../images/logo.jpg" className='w-40' />
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