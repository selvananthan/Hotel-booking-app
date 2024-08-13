import React from 'react';
import { Container, Typography, Box, Paper, Fade, Slide } from '@mui/material';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const HomeContent = () => {
  return (
    <Container sx={{ py: 4, maxWidth: '100%', padding: 0 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          position: 'relative', // Positioning for overlay
          backgroundImage: 'url(./peakpx.jpg)', // Set your background image path here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white', // Adjust text color for better readability
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
            background: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
            borderRadius: 2,
            zIndex: 1, // Ensure overlay is behind text
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
          {/* Title with bounce animation */}
          <Fade in timeout={1000}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                mb: 3,
                color: '#ffffff',
                fontWeight: 'bold',
                animation: `${bounce} 2s ease-in-out`,
              }}
            >
              Welcome to Our Stay-Inn...
            </Typography>
          </Fade>

          {/* Text paragraphs with slide-in effect */}
          <Slide direction="up" in timeout={1500}>
            <Box>
              <Typography variant="body1" paragraph sx={{ mb: 2, lineHeight: 1.6 }}>
                Discover the best hotels around the world with our easy-to-use booking platform. Whether you're looking for a luxury getaway, a family vacation, or a business trip, we have a wide range of options to suit your needs.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2, lineHeight: 1.6 }}>
                Our platform offers real-time availability, competitive prices, and detailed reviews to help you make the best choice for your stay. Explore our hotel listings and book your next adventure with confidence.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2, lineHeight: 1.6 }}>
                Join our community of travelers and enjoy exclusive deals and offers. Stay tuned for exciting updates and travel tips on our blog.
              </Typography>
            </Box>
          </Slide>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomeContent;
