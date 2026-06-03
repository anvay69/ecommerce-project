import ProductDetails from "./ProductDetails";

export function ProductsGrid({ products, loadCartItems }) {
  return (
    <div className="products-grid">

      {products.map((product) => {
        return (
          <ProductDetails key={product.id} product={product} loadCartItems={loadCartItems}/>
        );
      })}
    </div>
  )
}