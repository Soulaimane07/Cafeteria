import { useEffect, useState } from "react";
import axios from 'axios'
import {serverUrl} from './Variables'

export const PageTitle = (title) => {
    useEffect(() => {
      document.title = title;
    }, [title]);
}

export const GetCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/categories`)
    .then(res => {
      setCategories(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return categories
}

export const GetCategorie = (id) => {
  const [categorie, setCategorie] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/categories/${id}`)
    .then(res => {
      setCategorie(res.data.data[0])
    })
    .catch(err=> {
      console.error(err);
    })
  }, [id])

  return categorie
}





export const GetPlats = () => {
  const [categories, setCategories] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/plats`)
    .then(res => {
      setCategories(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return categories
}

export const GetPlatsByCategorie = (categorieId) => {
  const [categories, setCategories] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/plats/categorie/${categorieId}`)
    .then(res => {
      setCategories(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return categories
}



export const IsFavorated = (plat, user) => {
  const [isFav, setIsFav] = useState(false)

  useEffect(()=> {
    axios.post('http://localhost:3005/favorites/isfavorated', {user: user, plat: plat})
      .then((res)=> {
        res.data.data ? setIsFav(res.data.data) : setIsFav(false)
      })
      .catch((err)=> {
        console.error(err);
      })
  }, [plat, user])
    
  return isFav
}