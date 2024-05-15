import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import OrderComp from '../../../Components/Orders/Order'
import { serverUrl } from '../../../Components/Variables'
import { ordersActions } from '../../../Redux/Slices/OrderSlices'
import { FaTrashCan } from "react-icons/fa6";
import {loadStripe} from '@stripe/stripe-js';


function Order() {
  const orders = useSelector(state => state.Orders.orders)
  const selectedOrders = useSelector(state => state.Orders.selectedOrder)

  const dispatch = useDispatch()
  const RemoveSelectionOrder = (order) => {
    dispatch(ordersActions.removeFromOrder(order))
  }

  let price = selectedOrders.reduce((totalPrice, item) => {
    return totalPrice + item.plat.prix;
  }, 0);


  const Commander = async () => {
        // setLoading(true)

        let productsDetails = []

        selectedOrders?.map(item=> productsDetails.push(item.plat))

        const stripe = await loadStripe("pk_test_51PEJqJAjFPVVpGXvyMYsXc0vHFMAFRhtA2wQtI2r20xOrYuM8VzwpaodOwTKg0tXJ1ToH7Mnuz68TWONzoJ3OxVs00WgiABLJJ")
        const headers = {"Content-Type": "application/json"}
        
        const response = await fetch(`${serverUrl}/paiments/checkout`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({plats: productsDetails})
        })

        // !response.ok && setLoading(false)
        


        const session = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })

        if(result.error){
            console.log(result.error);
        // setLoading(false)
        }
  }


  return (
    <>
          <main className='flex'>
              <Sidebar />
              <section className='min-h-screen w-full bg-gray-100 rounded-lg'>
                    <Navbar />
  
                    <div className='flex items-start'>

                        <section className='flex-1 rounded-md px-10 '>
                            <h1 className=' text-4xl font-medium'> Orders </h1>

                            <div className='grid grid-cols-3 gap-6 mt-6'>
                                {orders?.map((item,key)=>(
                                    <OrderComp order={item} selectedOrders={selectedOrders} key={key} />
                                ))}
                            </div>
                        </section>

                        <section className='mt-14 mr-10 w-80 px-4 py-4 sticky top-0 bg-white text-center'>
                            <h1 className='text-center mb-4 font-medium text-xl'> Your Order </h1>

                            <ul className=' mb-2'>
                                {selectedOrders?.map((item,key)=>(
                                    <button onClick={()=> RemoveSelectionOrder(item)} key={key} className='List w-full hover:text-red-600 transition-all py-1 px-4 rounded-sm hover:bg-red-50 flex justify-between'>
                                        <h2 className='font-medium'>{item.plat.titre}</h2>
                                        <div className='flex space-x-2'>
                                            <p className='opacity-80'>${item.plat.prix}</p>
                                            <button className=' hidden '> <FaTrashCan size={16} /> </button>
                                        </div>
                                    </button>
                                ))}
                                <hr className='mt-3 mb-3'></hr>
                                <li className='flex px-4 justify-between font-medium text-lg'>
                                    <h2 className='font-medium text-lg'> Total </h2>
                                    <p> ${price} </p>
                                </li>
                            </ul>

                            <form action={`${serverUrl}/paiments/checkout`} method="POST">
                                <button onClick={Commander} type="submit" className='font- mt-4 text-lg text-center py-2 bg-primaryColor w-full rounded-md'>
                                    Checkout Now
                                </button>
                            </form>
                        </section>
                    </div>
              </section>
          </main>
  
          <Footer />
      </>
  )
}

export default Order