import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const PaymentButton = ({ amount }) => {

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://hotel-booking-app-backend-main.onrender.com/api/payment', {
        amount, // Amount in smallest currency unit (e.g., 100 for INR 1.00)
        currency: 'INR'
      });

      const { orderId, amount, currency } = response.data;

      const options = {
        key: 'your_key_id', // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: 'Stay-Inn',
        description: 'Hotel Booking Payment',
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          // Verify payment on the backend
          const result = await axios.post('https://hotel-booking-app-backend-main.onrender.com/api/payment/verify', paymentData);

          if (result.data.message === 'Payment verified successfully') {
            alert('Payment Successful!');
          } else {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: 'Customer Name', // Fetch from user data
          email: 'customer@example.com', // Fetch from user data
          contact: '9999999999', // Fetch from user data
        },
        notes: {
          address: 'Stay-Inn Corporate Office',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed');
    }
  };

  return (
    <Button onClick={handlePayment} variant="contained" color="primary">
      Pay Now
    </Button>
  );
};

export default PaymentButton;
