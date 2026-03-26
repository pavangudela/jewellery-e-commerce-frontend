 
import './App.css'
import "remixicon/fonts/remixicon.css";

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import UpdateUserName from './pages/updateUserName'
import ChangePassword from './pages/ChangePassword'
import Login from './pages/Login'
import { useState } from 'react'
import EditOrAddAddress from './pages/EditOrAddAddress'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import Unauthorized from './pages/Unauthorized'
import ManageUsers from './pages/ManageUsers'
import ManangeOrders from './pages/ManangeOrders'
import ManageProducts from './pages/ManageProducts'
import ManageOrderItems from './pages/ManageOrderItems'
import EditOrAddProduct from './pages/EditOrAddProduct'
import Register from './pages/Register'
import { NotificationContainer } from './components/notification'
import PlaceOrder from './pages/PlaceOrder'
function App() {
 const [auth,setAuth]=useState(!!localStorage.getItem("token"));
  return (
    
    <div >
     <NotificationContainer />

   <BrowserRouter>
       <Navbar auth={auth} setAuth={setAuth}/>
          <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/admin' element={<ProtectedRoute RequiredRole="ADMIN">
      <Admin/>
    </ProtectedRoute>}/>
    <Route path="/Manage Users" element={<ProtectedRoute RequiredRole="ADMIN">
      <ManageUsers/> 
    </ProtectedRoute>}/>
    <Route path='/Manage Orders' element={<ProtectedRoute  RequiredRole="ADMIN" >
      <ManangeOrders/>
    </ProtectedRoute>}/>
    <Route path="/Manage Products" element={<ProtectedRoute RequiredRole="ADMIN" >
      <ManageProducts/>
    </ProtectedRoute>}/>
    <Route path="/manageOrderItems/:id" element={<ProtectedRoute RequiredRole="ADMIN">
     <ManageOrderItems/>
    </ProtectedRoute>}/>
    <Route path='/edit or add product/:id' element={<ProtectedRoute RequiredRole="ADMIN">
      <EditOrAddProduct/>
    </ProtectedRoute>}/>
    <Route path='/place order' element={<ProtectedRoute RequiredRole="CUSTOMER" > <PlaceOrder/></ProtectedRoute>} />
    <Route path="unauthorized" element={<Unauthorized/>}/>
    <Route path='/login' element={<Login setAuth={setAuth} />}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/profile' element={<Profile auth={auth} setAuth={setAuth}/>}/>
    <Route path='/editOrAddAddress/:Id' element={<EditOrAddAddress/>}/>
    <Route path='/updateUsername' element={<UpdateUserName/>}/>
    <Route path='/changePassword' element={<ChangePassword/>}/>
    <Route path="/product/:productId" element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
   </Routes>
   </BrowserRouter>
    </div>
    
  )
}

export default App

