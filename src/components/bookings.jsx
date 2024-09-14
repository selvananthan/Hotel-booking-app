import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Card, CardContent, Typography, CardActions, Button, Container, Grid ,Box} from '@mui/material';
const Bookings=()=>{
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const token=localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Adjust according to your token payload structure
        console.log("User ID:", userId);
        const url = `https://hotel-booking-app-backend-main.onrender.com/api/bookings/getbookings?userId=${userId}`;
      // Fetch bookings from the API
      axios.get(url) // Adjust the endpoint as needed
        .then((response) =>{ 
            setBookings(response.data)})
        .catch((error) => console.error('Error fetching bookings:', error));
    }, []);
    return(
        <>
         <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bookings
      </Typography>
      <Grid container spacing={2}>
        {(bookings.length > 0) ? (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Hotel: {booking.hotelId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Guest: {booking.guestname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {booking.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dates: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Price: ${booking.totalPrice}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))) :
        (<Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="40vh" // Adjust the height as needed
          >
            <Typography variant="h3">
              No bookings available!!
            </Typography>
          </Box>)
         }
      </Grid>
    </Container>
        </>
    )
  
}
export default Bookings;