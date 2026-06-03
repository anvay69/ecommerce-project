import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

export default function OrderSummary({ deliveryOptions , cart , loadCartItems }) {
  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && 
      cart.map((cartItem) => {
        
        
        return (
          <div key={cartItem.productId} className="cart-item-container">
            
            <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />

            <div className="cart-item-details-grid">
              
              <CartItemDetails cartItem={cartItem}/>

              <DeliveryOptions 
                deliveryOptions={deliveryOptions} 
                cartItem={cartItem} 
                loadCartItems={loadCartItems}
              />
            </div>
          </div>
        );
      })}
    </div>
  )
}