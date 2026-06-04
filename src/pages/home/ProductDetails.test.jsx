import { it, expect, describe, vi } from 'vitest';
import ProductDetails from './ProductDetails';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios' ;

vi.mock('axios');


describe(('ProductDetails component'), () => {
  it('displays the product details correctly', () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    const loadCartItems = vi.fn();

    render(<ProductDetails loadCartItems={loadCartItems} product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();

    expect(screen.getByText('$10.90')).toBeInTheDocument();

    expect(screen.getByTestId('product-image')).toHaveAttribute('src', product.image);

    expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', `images/ratings/rating-45.png`)

    expect(screen.getByText('87')).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    const loadCartItems = vi.fn();

    render(<ProductDetails loadCartItems={loadCartItems} product={product} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button').click();
    await user.click(addToCartButton);

    expect(loadCartItems).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: product.id,
      quantity: 1
    });
  })
});