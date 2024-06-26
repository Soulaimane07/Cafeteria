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
export const GetUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/users`)
    .then(res => {
      setUsers(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return users
}

export const GetTables = () => {
  const [tables, setTables] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/tables`)
    .then(res => {
      setTables(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return tables
}
export const GetDishes = () => {
  const [dishes, setDishes] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/dishes`)
    .then(res => {
      setDishes(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return dishes
}



export const GetOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/orders`)
    .then(res => {
      setOrders(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return orders
}

export const GetReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/reservations`)
    .then(res => {
      setReservations(res.data.data)
    })
    .catch(err=> {
      console.error(err);
    })
  }, [])

  return reservations
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

export const GetDish= (id) => {
  const [dish, setDish] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/dishes/${id}`)
    .then(res => {
      setDish(res.data.data[0])
    })
    .catch(err=> {
      console.error(err);
    })
  }, [id])

  return dish
}
export const GetTable= (id) => {
  const [table, setTable] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/tables/${id}`)
    .then(res => {
      setTable(res.data.data[0])
    })
    .catch(err=> {
      console.error(err);
    })
  }, [id])

  return table
}

export const GetUser= (id) => {
  const [user, setUser] = useState([])

  useEffect(()=> {
    axios.get(`${serverUrl}/users/${id}`)
    .then(res => {
      setUser(res.data.data[0])
    })
    .catch(err=> {
      console.error(err);
    })
  }, [id])

  return user
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



export const Removeuser = (id) => {
  axios.delete(`http://localhost:3005/users/${id}`)
  .then(res =>{
    console.log("Deleted !");
  })
}