import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import {AdminRoutes, ClientRoutes} from './Components/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './Redux/Slices/UserSlice';
import { useEffect } from 'react';

import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import ReadUsers from './Pages/Admin/Users/ReadUsers';
import AddUsers from './Pages/Admin/Users/AddUsers';
import ReadDish from './Pages/Admin/Dishes/ReadDish';
import ReadCategories from './Pages/Admin/Categories/ReadCategories';
import ReadTables from './Pages/Admin/Tables/ReadTables';
import ReadReservations from './Pages/Admin/Reservations/ReadReservations';
import ReadOrders from './Pages/Admin/Orders/ReadOrders';
import ReadPaiment from './Pages/Admin/Paiment/ReadPaiment';
import Home from './Pages/Client/Home/Home';
import Categories from './Pages/Client/Categories/Categories';
import CategorieDetails from './Pages/Client/Categories/CategorieDetails';
import AddTables from './Pages/Admin/Tables/AddTables';
import AddDish from './Pages/Admin/Dishes/AddDish';
import EditUsers from './Pages/Admin/Users/EditUsers';
import Plats from './Pages/Client/Plats/Plats';
import { favoritsActions, getFavorits } from './Redux/Slices/FavoriteSlice';
import Favorites from './Pages/Client/Favorites/Favorites';
import PlatOrder from './Pages/Client/Plats/PlatOrder';
import AddCategory from './Pages/Admin/Categories/AddCategory';
import EditTable from './Pages/Admin/Tables/EditTable';
import EditDish from './Pages/Admin/Dishes/EditDish';
import EditCategory from './Pages/Admin/Categories/EditCategory';
import Added from './Components/Alerts/Added';
import Order from './Pages/Client/Order/Order';
import { getOrders, ordersActions } from './Redux/Slices/OrderSlices';



function App() {
  const user = useSelector(state => state.User)
  const isOpened = useSelector(state => state.PageOrder.opened)
  const isOpenedd = useSelector(state => state.AddedTo.oppened)
  // console.log(orders);

  const dispatch = useDispatch()
  
  useEffect(()=> {
    let user = JSON.parse(localStorage.getItem('cafeteria_user'))

    if(user) {
      dispatch(UserActions.login(user))
      dispatch(getFavorits(user?._id))
      dispatch(getOrders(user?._id))
    } else {
      dispatch(UserActions.logout())
      dispatch(favoritsActions.emptyFavorites())
      dispatch(ordersActions.emptyOrders())
    }
  }, [dispatch])





  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          
          {/* <Route element={<AdminRoutes />}> */}
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin</users' element={<ReadUsers />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<ReadUsers />} />
            <Route path='/admin/adduser' element={<AddUsers />} />
            <Route path='/admin/edituser/:id' element={<EditUsers />} />
            <Route path='/admin/dishes' element={<ReadDish />} />
            <Route path='/admin/adddish' element={<AddDish />} />
            <Route path='/admin/editdish/:id' element={<EditDish />} />
            <Route path='/admin/categories' element={<ReadCategories />} />
            <Route path='/admin/addcategory' element={<AddCategory />} />
            <Route path='/admin/editcategory/:id' element={<EditCategory />} />
            <Route path='/admin/tables' element={<ReadTables />} />
            <Route path='/admin/addtable' element={<AddTables />} />
            <Route path='/admin/edittable/:id' element={<EditTable />} />
            <Route path='/admin/reservations' element={<ReadReservations/>} />
            <Route path='/admin/orders' element={<ReadOrders />} />
            <Route path='/admin/paiments' element={<ReadPaiment />} />
            <Route path='/admin/addtable' element={<AddTables />} />
            <Route path='/admin/editdish' element={<EditDish />} />
          {/* </Route> */}
          {/* </Route> */}
          
          <Route element={<ClientRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/categories'>
              <Route index element={<Categories />} />
              <Route path=':categorieId' element={<CategorieDetails />} />
            </Route>
            <Route path='/plats' element={<Plats />} />
            <Route path='/favorite' element={<Favorites />} />
            <Route path='/order' element={<Order />} />
          </Route>

        </Routes>
        {isOpened && <PlatOrder />}
        {isOpenedd && <Added />}
      </BrowserRouter>
    </div>
  );
}

export default App;
