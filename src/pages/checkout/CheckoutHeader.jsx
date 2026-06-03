import { Link } from 'react-router';
import './CheckoutHeader.css';

// images
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import LogoImage from '../../assets/images/logo.png';
import MobileLogoImage from '../../assets/images/mobile-logo.png';


export default function CheckoutHeader({ cart }) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={LogoImage} />
            <img className="mobile-logo" src={MobileLogoImage} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{totalQuantity} {totalQuantity == 1 ? "item" : "items"}</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} />
        </div>
      </div>
    </div>
  );
}