import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import {AdminRoutes, ClientRoutes} from './Components/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './Redux/Slices/UserSlice';
import { useEffect } from 'react';

// import ReadUsers from './Pages/Admin/Users/ReadUsers';
import ReadTables from './Pages/Admin/Tables/ReadTables';
import ReadReservations from './Pages/Admin/Rerservations/ReadReservations';
import ReadOrders from './Pages/Admin/Orders/ReadOrders';
import ReadPaiment from './Pages/Admin/Paiment/ReadPaiment';
import Home from './Pages/Client/Home/Home';
import Categories from './Pages/Client/Categories/Categories';
import CategorieDetails from './Pages/Client/Categories/CategorieDetails';

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

          <Route element={<AdminRoutes />}>
            {/* <Route path='/admin/dashboard' element={<Dashboard />} /> */}
            {/* <Route path='/admin/users' element={<ReadUsers />} /> */}
            {/* <Route path='/admin/products' element={<ReadProduct />} /> */}
            {/* <Route path='/admin/categories' element={<ReadCategories />} /> */}
            <Route path='/admin/tables' element={<ReadTables />} />
            <Route path='/admin/reservations' element={<ReadReservations/>} />
            <Route path='/admin/orders' element={<ReadOrders />} />
            <Route path='/admin/paiments' element={<ReadPaiment />} />
          </Route>
          
          <Route element={<ClientRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/categories'>
              <Route index element={<Categories />} />
              <Route path=':categorieId' element={<CategorieDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
