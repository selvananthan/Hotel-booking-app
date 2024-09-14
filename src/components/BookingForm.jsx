import React, { useState ,useEffect} from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';


const BookingForm = ({ open, onClose, hotel }) => {
  const [name, setName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const handlePayement=(src)=>{
      return new Promise((resolve)=>{
     const script=document.createElement('script')
     script.src=src
       script.onload=()=>{
        resolve(true)

       }
       script.onerror=()=>{
        resolve(false);
       }
       document.body.appendChild(script)
       
      })



    }
   useEffect(()=>{
    handlePayement("https://checkout.razorpay.com/v1/checkout.js")
   },[])
    const bookingDetails = {
      hotelId: hotel._id,
      name,
      checkInDate,
      checkOutDate
    };

    axios.post('https://hotel-booking-app-backend-main.onrender.com/api/bookings', bookingDetails)
      .then(response => {
        alert('Booking successful!');
        onClose();
      })
      .catch(error => {
        alert('Error booking hotel: ' + error.message);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book {hotel?.name}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant="subtitle1">Booking Details</Typography>
          <TextField
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Check-In Date"
            type="date"
            variant="outlined"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check-Out Date"
            type="date"
            variant="outlined"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="booking-form" variant="contained" color="primary">Book Now</Button>
        <Button onClick={displayRazorpayModal} >Make Payment</Button>
      </DialogActions>
    </Dialog>

  );
};

export default BookingForm;
