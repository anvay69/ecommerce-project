import axios from 'axios';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';


export default function HomePage({ cart, loadCartItems }) {

  // to store products data
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  // laoding products data
  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get(
        `/api/products${search ? `?search=${search}` : ''}`
      );
      setProducts(response.data);
    }
    
    getProductData();
  }, [search]);

  
  // html of home page
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart}/>

      <div className="home-page">

        <ProductsGrid products={products} loadCartItems={loadCartItems}/>

      </div>
    </>
  )
}