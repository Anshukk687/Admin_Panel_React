import './index.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import LoginSignup from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Register';
import Dashboard from './Pages/Dashboard';
import Protected from './Protected';
import SideMenu from './Components/SideMenu';
import Inventory from './Pages/Inventory';
import Orders from './Pages/Orders';
import Customers from './Pages/Customers';
import { Outlet } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("user-info");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const SidebarLayout = () => (
    <>
      <SideMenu />
      <Outlet />
    </>
  );

  return (
    <div className="App">
      <div className='dashboard'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/register" element={<Signup />} />
            
            <Route element={<SidebarLayout/>}>
              <Route path="/dashboard" element={<Protected element={Dashboard} />} />
              <Route path="/inventory" element={<Protected element={Inventory} />} />
              <Route path="/orders" element={<Protected element={Orders} />} />
              <Route path="/customers" element={<Protected element={Customers} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;