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