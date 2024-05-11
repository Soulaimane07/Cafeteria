import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from './Pages/Home/Home';
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
import AddTables from './Pages/Admin/Tables/AddTables';
import AddDish from './Pages/Admin/Dishes/AddDish';
import EditUsers from './Pages/Admin/Users/EditUsers';

function App() {
  const user = useSelector(state => state.User)
  console.log(user);

  const dispatch = useDispatch()
  
  useEffect(()=> {
    let user = JSON.parse(localStorage.getItem('cafeteria_user'))

    if(user) {
      dispatch(UserActions.login(user))
    } else {
      dispatch(UserActions.logout())
    }
  }, [dispatch])





  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<ReadUsers />} />
            <Route path='/admin/adduser' element={<AddUsers />} />
            <Route path='/admin/edituser' element={<EditUsers />} />
            <Route path='/admin/dishes' element={<ReadDish />} />
            <Route path='/admin/adddish' element={<AddDish />} />
            <Route path='/admin/categories' element={<ReadCategories />} />
            <Route path='/admin/tables' element={<ReadTables />} />
            <Route path='/admin/reservations' element={<ReadReservations/>} />
            <Route path='/admin/orders' element={<ReadOrders />} />
            <Route path='/admin/paiments' element={<ReadPaiment />} />
            <Route path='/admin/addtable' element={<AddTables />} />
          <Route element={<AdminRoutes />}>
            
          </Route>
          
          <Route element={<ClientRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
