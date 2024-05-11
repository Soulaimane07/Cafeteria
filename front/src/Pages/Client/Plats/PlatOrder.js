import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import { PageOrderActions } from '../../../Redux/Slices/PageOrder';
import { serverUrl } from '../../../Components/Variables';
import OrderButton2 from '../../../Components/Buttons/OrderButton2';

function PlatOrder() {
    const dispatch = useDispatch()
    const plat = useSelector(state=> state.PageOrder.plat)

    const Close = () => {
        dispatch(PageOrderActions.close())
    }

    const AddToOrder = () => {

    }

  return (
    <div className='Glass fixed top-0 left-0 w-full h-screen flex items-center justify-center '>
        <div className=' bg-white w-1/2  rounded-md flex relative py-6 pr-6 space-x-4 items-stretch'>
            <button className=' absolute top-10 right-6' onClick={Close}> <IoClose size={30} /> </button>
            <section className='h-fit w-fit'>
                <img className='' src={`${serverUrl}/${plat.image}`} alt={plat.titre} />
            </section>
            <section className='py-3 h-fit'>
                <h1 className='text-3xl font-medium'> {plat.titre} </h1>
                <p className=' opacity-80 mt-3 mb-6'> {plat.description} </p>
                <div className='flex justify-between items-center'>
                    <div className='font-medium text-xl flex flex-col'> 
                        <p className='opacity-80 mb-1'>${plat.prix} </p>
                        <p className='font-bold'>${plat.prix} </p>
                    </div>
                    <button onClick={AddToOrder} className=' bg-primaryColor hover:bg-green-500 transition-all w-fit text-white py-3 px-8 text-md rounded-md font-medium'>
                        Add to order
                    </button>
                </div>
            </section>
        </div>
    </div>
  )
}

export default PlatOrder