import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import TrackingPage from './pages/tracking/TrackingPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);


  const loadCartItems = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  }

  // getting cart items, mostly for header
  useEffect(() => {
    loadCartItems();
  }, []);


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCartItems={loadCartItems}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCartItems={loadCartItems} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} loadCartItems={loadCartItems}/>} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  )
}

export default App
