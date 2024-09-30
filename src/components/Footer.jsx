import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        py: 2,
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #ddd' // Optional: Adds a subtle border at the top of the footer
      }}
    >
      <Container>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Contact Us: +91-9791456689 | selvagoogly@gmail.com
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          &copy; {new Date().getFullYear()} Stay-Inn. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <IconButton
            href="https://github.com/selvananthan" // Replace with your GitHub profile URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            sx={{ color: '#333', '&:hover': { color: '#000' } }}
          >
            <GitHubIcon />
          </IconButton>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

