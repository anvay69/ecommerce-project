import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export default function CartItemDetails({ cartItem, loadCartItems }) {
  const [quantityUpdate, setQuantityUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  // toggles the quantityUpdate state on clicking 'Update'
  const toggleUpdateQuantity = async () => {
    if (quantityUpdate) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      
      await loadCartItems();
    }

    setQuantityUpdate(!quantityUpdate);
  }

  // updates the quantity based on the input
  const updateQuuantity = async (event) => {
    setQuantity(event.target.value);
  }

  // handle key presses on input element for update
  const handleInputKey = async (event) => {
    if (event.key === 'Enter') {
      await toggleUpdateQuantity();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setQuantityUpdate(false);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCartItems();
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {quantityUpdate ?
              <input
                className="quantity-update-input"
                type="text"
                value={quantity}
                onChange={updateQuuantity}
                onKeyDown={handleInputKey}
              /> :
              <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={toggleUpdateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  )
}