import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardMedia, CardContent } from '@mui/material';

const sampleHotels = [
  // Sample hotel data...
];

const HomeContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    if (sampleHotels.length > 0) {
      setDialogOpen(true); // Open dialog when there are hotels available
    } else {
      setDialogOpen(false); // Close dialog if no hotels are available
    }
  }, []);

  const handleDialogOpen = (hotel) => {
    setSelectedHotel(hotel);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ py: 4, maxWidth: '100%', padding: 0, display: 'flex' }}>
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            position: 'relative',
            backgroundImage: 'url(./peakpx.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            width: '100%',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Semi-transparent overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 2,
              zIndex: 1,
            }}
          />
          <Typography variant="h4" sx={{ zIndex: 2, mb: 2 }}>
            Welcome to Our Hotel Booking
          </Typography>
          <Typography variant="h6" sx={{ zIndex: 2, mb: 2 }}>
            Find your perfect stay
          </Typography>
        </Paper>
      </Box>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Hotel Details</DialogTitle>
        <DialogContent>
          {selectedHotel && (
            <Box sx={{ width: 500 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedHotel.image}
                  alt={selectedHotel.name}
                />
                <CardContent>
                  <Typography variant="h6">{selectedHotel.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedHotel.location}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Price: ${selectedHotel.price} per night
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Rating: {selectedHotel.rating} stars
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Description: {selectedHotel.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Available Rooms: {selectedHotel.available_rooms}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomeContent;
