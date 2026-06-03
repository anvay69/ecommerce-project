import ProductDetails from "./ProductDetails";

export function ProductsGrid({ products }) {
  return (
    <div className="products-grid">

      {products.map((product) => {
        return (
          <ProductDetails key={product.id} product={product}/>
        );
      })}
    </div>
  )
}