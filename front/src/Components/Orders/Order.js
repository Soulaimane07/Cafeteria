import React, { useState } from 'react'
import { serverUrl } from '../Variables'
import { useDispatch } from 'react-redux'
import { ordersActions } from '../../Redux/Slices/OrderSlices'

function Order({order, selectedOrders}) {

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch()
  const addToOrder = () => {
    setChecked(!checked)
      !checked
          ?   dispatch(ordersActions.addToOrder(order))
          :   dispatch(ordersActions.removeFromOrder(order))
  }

  let selected = selectedOrders.filter(function(itemm) {
    return itemm._id === order._id 
  })


  return (
      <button onClick={addToOrder} className={`${selected.length !== 0  ? 'bg-green-200' : 'bg-white'} p-6 rounded-md hover:bg-primaryColor transition-all`}> 
          <img className='w-28 mx-auto' src={`${serverUrl}/${order.plat.image}`} alt={order.plat.image} />
          <div className='flex items-center justify-between mb-2 mt-2'>
              <h1 className='text-center mt-2 font-medium'> {order.plat.titre} </h1> 
              {/* <FavoriteButton order.plat={order.plat} fav={fav ?? isFavorated?._id} favorated={favorated ?? isFavorated?._id} /> */}
          </div>
          <p className=' opacity-60'> {order.plat.description?.substring(0, 60)} </p>

          <div className='flex items-center justify-between mt-4'>
              <p className='font-medium text-xl'> ${order.plat.prix} </p>
          </div>
      </button>
  )
}

export default Order