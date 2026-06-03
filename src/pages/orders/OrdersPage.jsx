import { Link } from 'react-router';
import Header from '../../components/Header';
import './OrdersPage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import OrdersGrid from './OrdersGrid';

// images


export default function OrdersPage({ cart , loadCartItems }) {
  // state to store the past orders
  const [orders, setOrders] = useState([]);

  // getting past orders from backend
  useEffect(() => {
    const getPastOrders = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }

    getPastOrders();
  }, []);


  // the html of the page
  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCartItems={loadCartItems}/>
      </div>
    </>
  )
}