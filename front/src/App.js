import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from './Pages/Home/Home';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './Redux/Slices/UserSlice';
import { useEffect } from 'react';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import ReadUsers from './Pages/Admin/Users/ReadUsers';
import ReadProduct from './Pages/Admin/Products/ReadProduct';
import ReadCategories from './Pages/Admin/Categories/ReadCategories';
import ReadTables from './Pages/Admin/Tables/ReadTables';
import ReadReservations from './Pages/Admin/Tables/ReadTables';
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
          <Route path='/admin/products' element={<ReadProduct />} />
          <Route path='/admin/categories' element={<ReadCategories />} />
          <Route path='/admin/Tables' element={<ReadTables />} />
          <Route path='/admin/Reservations' element={<ReadReservations/>} />
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
