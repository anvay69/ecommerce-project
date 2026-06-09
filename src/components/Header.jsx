import { NavLink, useNavigate, useSearchParams } from 'react-router';
import './Header.css';

// images
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import LogoWhiteImage from "../assets/images/logo-white.png";
import MobileLogoWhiteImage from "../assets/images/mobile-logo-white.png";
import { useEffect, useState } from 'react';


export default function Header({ cart }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    search && setQuery(search);
  }, [searchParams]);

  const updateQuery = (event) => {
    setQuery(event.target.value);
  }

  const searchQuery = () => {
    navigate(`/?search=${query}`);
  }

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });


  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhiteImage} />
          <img className="mobile-logo"
            src={MobileLogoWhiteImage} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={updateQuery}
          value={query}
        />

        <button onClick={searchQuery} className="search-button">
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}