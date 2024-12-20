import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Modal from './Components/Modal';
import { useRecoilState } from 'recoil';
import { currUser, loading, openModal } from './StateManagement/State';
import Footer from './Components/Footer';
import NewSettler from './Components/NewSettler';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserByEmail } from './Utils/dataFtech';
const Home = React.lazy(() => import('./Pages/Home'));
const Collection = React.lazy(() => import('./Pages/Collection'));
const ProductPage = React.lazy(() => import('./Pages/ProductPage'));
const Signup = React.lazy(() => import('./Pages/Signup'));
const Login = React.lazy(() => import('./Pages/Login'));
const CartPage = React.lazy(() => import('./Pages/CartPage'));
const Payment = React.lazy(() => import('./Pages/Payment'));
const OrdersPage = React.lazy(() => import('./Pages/OrdersPage'));
function App() {
  const [modalType,setModalType]=useRecoilState(openModal);
  const [user,setUser]=useRecoilState(currUser);
  const [load,setLoad]=useRecoilState(loading);
  useEffect(()=>{
    async function renewUser(){
      setLoad(true);
      let userEmail=localStorage.getItem('user');
      if(userEmail){
        let x=await fetchUserByEmail(userEmail);
        setUser(x)
      }
      setLoad(false);
    }
    renewUser();
  },[]);
  return (
    <div className={`relative h-screen`}>
      <Router>
        <NavBar />
        <Modal/>
        <ToastContainer/>
        <Suspense >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection/:path/:category/:pageIndex" element={<Collection />} />
            <Route path="/product/:category/:id" element={<ProductPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
          <div className="div-container flex justify-center items-center px-16 py-10">
                <NewSettler/>
          </div>
          <Footer/>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
