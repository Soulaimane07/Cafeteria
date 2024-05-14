import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { PageOrderActions } from '../../Redux/Slices/PageOrder'

function OrderButton({plat}) {
  const dispatch = useDispatch()

  const Order = () => {
    dispatch(PageOrderActions.open(plat))
  }

  return (
        <button onClick={Order} className='bg-green-100 hover:bg-white transition-all p-2 text- rounded-md'> <FaPlus /> </button>
  )
}

export default OrderButton