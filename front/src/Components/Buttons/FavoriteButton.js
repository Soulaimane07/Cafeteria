import axios from 'axios';
import React from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";
import { serverUrl } from '../Variables';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorits } from '../../Redux/Slices/FavoriteSlice';

function FavoriteButton({plat, fav, favorated}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.User)

  const Favorit = () => {
    axios.post(`${serverUrl}/favorites/`, {user: user?.data?._id, plat: plat})
      .then((res)=> {
        dispatch(getFavorits(user?.data?._id))
      })
      .catch(err=> {
        console.error(err);
      })
  }

  const RemoveFavorite = () => {
    console.log(fav);
    axios.delete(`${serverUrl}/favorites/${fav}`)
      .then((res)=> {
        dispatch(getFavorits(user?.data?._id))
        console.log('l');
      })
      .catch(err=> {
        console.error(err);
      })
  }
  
  return (
    <button onClick={favorated ? RemoveFavorite : Favorit } className='hover:scale-125 transition-all'> 
      {favorated ? <TiHeartFullOutline size={26} color='red' /> : <FaRegHeart size={20} />}
    </button>
  )
}

export default FavoriteButton