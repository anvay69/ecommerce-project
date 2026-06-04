import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import PaymentSummary from './PaymentSummary';

vi.mock('axios');

let loadCartItems;
let paymentSummary;
let Location;

describe(('PaymentSummary component'), () => {
  beforeEach(() => {

    Location = () => {
      const location = useLocation();
      return (
        <div data-testid="location-display">{location.pathname}</div>
      );
    }

    loadCartItems = vi.fn();

    paymentSummary = {
      "totalItems": 1,
      "productCostCents": 799,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 799,
      "taxCents": 80,
      "totalCostCents": 879
    };
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCartItems={loadCartItems} />
        <Location />
      </MemoryRouter>
    );
  });


  it('displays the payment summary details correctly', () => {
    expect(screen.getByTestId('product-cost')).toHaveTextContent('$7.99');
    expect(screen.getByTestId('shipping-cost')).toHaveTextContent('$0.00');
    expect(screen.getByTestId('total-before-tax')).toHaveTextContent('$7.99');
    expect(screen.getByTestId('tax')).toHaveTextContent('$0.80');
    expect(screen.getByTestId('total')).toHaveTextContent('$8.79');
  });


  it('creates an order and navigates to the orders page when Place your order button is clicked', async () => {
    const user = userEvent.setup();
    const placeOrderButton = await screen.getByTestId('place-order-button');

    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCartItems).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('location-display')).toHaveTextContent('/orders');
  });
});