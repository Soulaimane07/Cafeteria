import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Footer from '../../../Components/Footer/Footer'
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { GetCategories, GetDishes, GetOrders, GetReservations, GetTables, GetUsers } from '../../../Components/Functions'
function Dashboard() {
  const Tables = GetTables()
  const Users=GetUsers()
  const Categories=GetCategories()
  const Dishes=GetDishes()
  const Orders=GetOrders()
  const Reservations=GetReservations()
  const paiments=[]
  const list =[
    {
        image: <FaRegUser size={40} />,
        title: "Users",
        stats:Users.length,
        link:"../../admin/users"
       
    },
    {
        image: <IoRestaurantOutline size={40} />,
        title: "Dishes",
        stats:Dishes.length,
        link:"../../admin/Dishes"
    },
    {
        image: <BiCategory size={40} />,
        title: "Catrgories",
        stats: Categories.length,
        link:"../../admin/categories"
       
       
    },
    {
      image: <IoCartOutline size={40} />,
      title: "Orders",
      stats: Orders.length,
      link:"../../admin/Orders"
  },
  {
    image: <MdOutlineTableBar size={40} />,
    title: "Tables",
    stats: Tables.length,
    link:"../../admin/Tables"
},
  {
    image: <RiBillLine size={40} />,
    title: "Reservations",
    stats: Reservations.length,
    link:"../../admin/Reservations"
},
{
  image: <MdAttachMoney size={40} />,
  title: "Paiments",
  stats: paiments.length,
  link:"../../admin/Paiments"
},
    
]
  return (
    <>
        <main className='flex'>
            <AdminSidebar />
            <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                <AdminNavbar />

                <section className=' rounded-md px-10 mt-10'>
                   
                <div className='grid grid-cols-2 w-4/5 gap-4  ml-20   '>
        {list.map((item,key)=>(
            <div key={key} className="w-full h-34  p-6  bg-white border border-gray-200 rounded-lg shadow">
                <Link to={item.link} className='flex items-center w-68 space-x-2'>
                   {item.image} 
                    <h5 className=" text-2xl font-medium tracking-tight text-gray-900"> {item.title} </h5>
                    <h5 className=" text-2xl font-medium tracking-tight text-gray-900"> ( {item.stats} ) </h5>
                </Link>
                
            </div>
        ))}
    </div>
                </section>
            </section>
        </main>

        <Footer />
    </>
  )
}

export default Dashboard