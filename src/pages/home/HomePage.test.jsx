import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';


vi.mock('axios');

let user;
let products;

beforeEach(() => {
  user = userEvent.setup();
  products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"]
    }
  ];
});


axios.get.mockImplementation(async (url) => {
  if (url === '/api/products') {
    return {
      data: products
    };
  }
});

describe(('HomePage component'), () => {
  let loadCartItems;

  beforeEach(() => {
    loadCartItems = vi.fn().mockResolvedValue(undefined);
  });

  it('displays the products correctly', async () => {

    render(
      <MemoryRouter><
        HomePage cart={[]} loadCartItems={loadCartItems} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers).toHaveLength(2);

    expect(within(productContainers[0])
      .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(within(productContainers[1])
      .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

  it('allows adding to cart', async () => {
    // rendering the home page
    render(
      <MemoryRouter><
        HomePage cart={[]} loadCartItems={loadCartItems} />
      </MemoryRouter>
    );

    // selecting quantity for both products
    const quantitySelectors = await screen.findAllByTestId('quantity-selector');
    await user.selectOptions(quantitySelectors[0], '2');
    await user.selectOptions(quantitySelectors[1], '3');

    // clicking add to cart buttons for both products
    const addButtons = await screen.findAllByTestId('add-to-cart-button');
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    // asserting that the correct API calls were made and loadCartItems was called twice
    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: products[0].id,
      quantity: 2
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: products[1].id,
      quantity: 3
    });

    // asserting that loadCartItems was called twice
    expect(loadCartItems).toHaveBeenCalledTimes(2);
  });
});
