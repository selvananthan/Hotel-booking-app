// src/HotelBooking.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const HotelBooking = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [amount, setAmount] = useState(1000); // Example amount, should be dynamic

  const handleBooking = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/hotels/${id}/book`, {
        guestName,
        checkInDate,
        checkOutDate,
        amount,
      });

      const { orderId, currency } = response.data;

      // Set up Razorpay payment options
      const options = {
        key: 'your_key_id', // Replace with your Razorpay Key ID
        amount: amount * 100,
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

          // Verify the payment
          const result = await axios.post('http://localhost:5000/api/payment/verify', paymentData);

          if (result.data.message === 'Payment verified successfully') {
            alert('Payment Successful! Booking confirmed.');
          } else {
            alert('Payment Verification Failed. Booking not confirmed.');
          }
        },
        prefill: {
          name: guestName, // Guest name
          email: 'guest@example.com', // Replace with the user's email
          contact: '9999999999', // Replace with the user's contact number
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
      console.error('Booking error:', error);
      alert('Booking failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Book Your Stay
      </Typography>
      <TextField  
        label="Guest Name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
     
      <TextField
        label="Check-In Date"
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Check-Out Date"
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled
      />
      <Button variant="contained" color="primary" onClick={handleBooking}>
        Book and Pay Now
      </Button>
    </Box>
  );
};

export default HotelBooking;
