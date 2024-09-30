import React from 'react';
import PaymentButton from '../PaymentButton';

const Checkout = () => {
  return (
    <div>
      <h2>Checkout Page</h2>
      <PaymentButton amount={1000} /> {/* Example amount */}
    </div>
  );
};

export default Checkout;
