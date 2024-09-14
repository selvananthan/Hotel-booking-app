import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, Button, Modal, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import BlogContent from './BlogContent'; 
import HomeContent from './HomeContent';
import HotelList from './HotelList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import { json } from 'react-router-dom';
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

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const NavBar = ({ currentTab, onTabChange }) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.get('https://hotel-booking-app-backend-main.onrender.com/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUserDetails(response.data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setIsLoggedIn(false);
        });
    }
  }, [token]);

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleToggle = () => setIsLogin(!isLogin);
  const loginData={
    "username": username,
    "password": password
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isLogin
      ? 'https://hotel-booking-app-backend-main.onrender.com/api/auth/login'
      : 'https://hotel-booking-app-backend-main.onrender.com/api/auth/register';
      const config = {
        headers: {
          'Content-Type': 'application/json', // You can set other headers as needed
          'Authorization': 'Bearer your-token-here', // Example for Authorization header
          // Add more headers if required
        },
      }
    const data = isLogin
      ? loginData
      : { username, email, password };
      console.log(data['username']);
      const JSONdata=JSON.stringify(data)
    axios
      .post(url,loginData,config)
      .then((response) => {
        if (response &&response.data) {
          alert(' Login Successfull');
          if (isLogin) {
            localStorage.setItem('token', response.data.token);
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
    setIsLoggedIn(false);
    setUserDetails(null);
    setToken(null);
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

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
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ flexGrow: 1 }}
          >
            <Tab label="Home" value="home" />
            <Tab label="bookings" value="bookings" />
            <Tab label="Blog" value="blog" />
          </Tabs>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              component="a"
              href="https://github.com/selvananthan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            {isLoggedIn ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleUserClick}
                  sx={{ ml: 2 }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => alert('View Profile')}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleModalOpen}
                sx={{ color: '#fff', height: '100%', ml: 2 }}
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
            <FormContainer
              component="form"
              onSubmit={handleSubmit}
            >
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
            <HotelList /> 
          </>
        )}
        {activeTab === 'hotels' && <HotelList />} 
        {activeTab === 'blog' && <BlogContent />} 
        {activeTab === 'bookings' && <Bookings />} 
        
      </Box>
    </>
  );
};

export default NavBar;
