import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from './Pages/Home/Home';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './Redux/Slices/UserSlice';
import { useEffect } from 'react';

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
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
