import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, Button, Modal, TextField, IconButton, Menu, MenuItem, Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import BlogContent from './BlogContent'; 
import HomeContent from './HomeContent';
import HotelList from './HotelList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import Bookings from './bookings';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  borderRadius: '8px',
});

const SearchButton = styled(Button)({
  backgroundColor: '#ff5722', // Change color to differentiate
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e64a19', // Darker shade on hover
  },
  padding: '10px 20px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: 'bold',
  marginLeft: '10px',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const NavBar = ({ currentTab, onTabChange }) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Autocomplete options (this can be replaced with dynamic data)
  const hotelOptions = [
    { title: 'Chennai' },
    { title: 'Mumbai' },
    { title: 'Madurai' },
    { title: 'Coimbatore' },
    { title: 'Rajasthan' },
  ];

  useEffect(() => {
    if(token){
      setIsLogin(true)
    }
 
  },);

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleToggle = () => setIsLogin(!isLogin);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isLogin
      ? 'https://hotel-booking-app-backend-main.onrender.com/api/auth/login'
      : 'https://hotel-booking-app-backend-main.onrender.com/api/auth/register';
    const data = isLogin
      ? { username, password }
      : { username, email, password };
    axios
      .post(url, data)
      .then((response) => {
        if (response && response.data) {
          alert('Login Successful');

          if (isLogin) {
            localStorage.setItem('token',JSON.stringify(response.data));
            setToken(response.data.token);
          }
          handleClose();
        } else {
          alert('Unexpected response format');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error: ' + (error.response?.data?.message || 'An error occurred'));
      });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setUserDetails(null);
    setToken(null);
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  const handleSearch = () => {
    // Implement the search functionality here
    console.log('Search:', searchQuery, selectedLocation);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          bgcolor: '#000',
          height: 80,
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img
              src="./online-booking.png"
              alt="Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Stay-Inn.
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Home" value="home" />
              <Tab label="Bookings" value="bookings" />
              <Tab label="Blog" value="blog" />
            </Tabs>
          



          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              component="a"
              href="https://github.com/selvananthan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            {isLogin ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ ml: 2 }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={() => alert('View Profile')}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleModalOpen}
                sx={{ color: '#fff', height: '100%', ml: 2, borderRadius: 20 }}
              >
                Login/Register
              </Button>
            )}
          </Box>
        </Toolbar>
        <Modal
          open={modalIsOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              variant="h5"
              sx={{ mb: 3, textAlign: 'center', color: '#1976d2' }}
            >
              {isLogin ? 'Login to Your Account' : 'Create an Account'}
            </Typography>
            <FormContainer component="form" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              {!isLogin && (
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              )}
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <StyledButton type="submit">
                {isLogin ? 'Login' : 'Register'}
              </StyledButton>
              <Button
                onClick={handleToggle}
                sx={{
                  width: '100%',
                  padding: '10px',
                  textTransform: 'none',
                  color: '#1976d2',
                }}
              >
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
              </Button>
            </FormContainer>
          </Box>
        </Modal>
      </AppBar>

      <Box sx={{ p: 4 }}>
        {activeTab === 'home' && (
          <>
            <HomeContent />
            <HotelList searchQuery={searchQuery} location={selectedLocation} />
          </>
        )}
        {activeTab === 'bookings' && <Bookings />}
        {activeTab === 'blog' && <BlogContent />}
      </Box>
    </>
  );
};

export default NavBar;
