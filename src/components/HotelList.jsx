import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Typography, Card, CardContent, CardMedia, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import {jwtDecode} from 'jwt-decode';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  marginBottom: 20,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: `0 4px 8px ${theme.palette.action.disabledBackground}`,
}));

// Button styles
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: `0 4px 8px ${theme.palette.action.disabledBackground}`,
  fontSize: '14px',
  padding: theme.spacing(1, 3),
  '&:hover': {
    boxShadow: `0 6px 12px ${theme.palette.action.disabledBackground}`,
  },
}));

const LargeBookNowButton = styled(StyledButton)(({ theme }) => ({
  fontSize: '16px',
  padding: theme.spacing(2, 4),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const ReviewButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.info.dark,
  },
}));

const CompareButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.warning.dark,
  },
}));

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortOption, setSortOption] = useState('price');
  const [search, setSearch] = useState('');
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openCompareDialog, setOpenCompareDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [review, setReview] = useState('');
  const [bookingDetails, setBookingDetails] = useState({ guestname: '', phoneNumber:null, startDate: '', endDate: '',totalPrice:null, });
  const [compareHotels, setCompareHotels] = useState([]);

  useEffect(() => {
    // Fetch hotel details from MongoDB via backend API
    // axios.get('http://localhost:5000/api/hotels')

    //   .then(response => setHotels(response.data))
    //   .catch(error => console.error("There was an error fetching the hotels!", error));
    const hotels=[
      {
          "_id": "66b9a6ceaab9dfe4a31cbfde",
          "name": "Kaldan Samudhra Palace",
          "price": 9000,
          "location": "Mahabalipuram, Tamil Nadu 603103",
          "amenities": [
              "Free WiFi",
              "Golf Course",
              "Spa",
              "Pool"
          ],
          "image": "https://lh3.googleusercontent.com/p/AF1QipNJW3_Sx0fd-EQJdYVO4CpqaaxTDayxopMmHhQD=s1360-w1360-h1020",
          "rating": "4.0"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc035",
          "name": "Vivanta by Taj",
          "location": "Coimbatore, Tamil Nadu",
          "description": "Stylish hotel offering a contemporary stay experience.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center"
          ],
          "rating": 4.6,
          "available_rooms": 40,
          "price": 9000,
          "image": "https://www.vivantahotels.com/content/dam/gateway/hotels/chennai/welcome/Vivanta_Image1.png/jcr:content/renditions/cq5dam.web.1280.1280.png"
      },
      {
          "_id": "66b9a6ceaab9dfe4a31cbfdc",
          "name": "Leela Palace Chennai",
          "price": 10000,
          "location": "Chennai, Tamil Nadu",
          "amenities": [
              "Free WiFi",
              "Sea view",
              "Pool",
              "Fine Dining"
          ],
          "image": "https://lh3.googleusercontent.com/p/AF1QipNA9f7_IUl4XosdyvWqpUWfaYZpuCNAPgIHi9Gm=s1360-w1360-h1020",
          "rating": "4.5"
      },
      {
          "_id": "66b9a6ceaab9dfe4a31cbfdd",
          "name": "ITC Grand Chola",
          "price": 11000,
          "location": "Chennai, Tamil Nadu",
          "amenities": [
              "Free WiFi",
              "Spa",
              "Pool",
              "Fitness Center"
          ],
          "image": "https://lh3.googleusercontent.com/proxy/Hoc8WLwE97wq1rsoW8-MCSvmKqUpi8P50Bmu8dVFDuW9p_yCQ-DjQFMtbAKAoOr164gyZ5TZhMVxnsyDD3S986FbTDxihWu3_7im2t58s65dsNMus5OL1Yqsd1dnYBZG1hCsDv5GeZcmX0bq0Fu7N2ASa-iIYw=s1360-w1360-h1020",
          "rating": "3.5"
      },
      {
          "_id": "66b9d391aab9dfe4a31cbfe3",
          "name": "Taj Fisherman's Cove Resort",
          "price": 11000,
          "location": "Chennai, Tamil Nadu",
          "amenities": [
              "Free WiFi",
              "Spa",
              "Pool",
              "Fitness Center"
          ],
          "image": "https://lh3.googleusercontent.com/p/AF1QipMZgQ417PZFLkSdy6HzaqxC6I9FlTTWBRMCg6CM=w287-h192-n-k-rw-no-v1",
          "rating": "4.0"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc037",
          "name": "Heritage Madurai",
          "location": "Madurai, Tamil Nadu",
          "description": "Historic resort offering a luxurious experience amidst nature.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center",
              "Heritage Walks"
          ],
          "rating": 4.7,
          "available_rooms": 22,
          "price": 11000,
          "image": "https://lh3.googleusercontent.com/p/AF1QipO-Y5tsBI1bCvwNldWiSzmzd2z-Kx6vkw4tae-7=s1360-w1360-h1020"
      },
      {
          "_id": "66b9a6ceaab9dfe4a31cbfda",
          "name": "Hotel Taj Mahal Palace",
          "price": 12000,
          "location": "Mumbai, Maharashtra",
          "amenities": [
              "Free WiFi",
              "Pool",
              "Spa",
              "Breakfast included"
          ],
          "image": "https://lh3.googleusercontent.com/p/AF1QipPjR_st_vsnuJdZwzWkJ3P1ur1QdjRyNcq4VS--=s1360-w1360-h1020",
          "rating": "4.9"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc034",
          "name": "Radisson Blu Resort Temple Bay",
          "location": "Mahabalipuram, Tamil Nadu",
          "description": "Beach resort with modern amenities near ancient temples.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center",
              "Beachfront"
          ],
          "rating": 4.7,
          "available_rooms": 20,
          "price": 12000,
          "image": "https://lh3.googleusercontent.com/p/AF1QipNAd2cZivXdhNwjGEn1bj-vOU1ydYg1Fkl1v4Ur=s1360-w1360-h1020"
      },
      {
          "_id": "66b9a6ceaab9dfe4a31cbfdb",
          "name": "The Oberoi Udaivilas",
          "price": 15000,
          "location": "Udaipur, Rajasthan",
          "amenities": [
              "Free WiFi",
              "Lake view",
              "Spa",
              "Private Boat Rides"
          ],
          "image": "https://lh3.googleusercontent.com/p/AF1QipMuXeRSEy6AIfsfaADUJ0WavsP_oJVDRIvrFraH=s1360-w1360-h1020",
          "rating": "5.0"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc032",
          "name": "Taj Coromandel",
          "location": "Chennai, Tamil Nadu",
          "description": "Luxury 5-star hotel located in the heart of Chennai.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center"
          ],
          "rating": 4.8,
          "available_rooms": 25,
          "price": 15000,
          "image": "https://lh3.googleusercontent.com/p/AF1QipN6nOoWZrdYsrFm6extCozmx0DfXlBzHWuTeoGw=s1360-w1360-h1020"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc036",
          "name": "Le Villagio Resort Domes",
          "location": "Chennai, Tamil Nadu",
          "description": "A grand luxury hotel with a blend of tradition and modernity.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center",
              "Fine Dining"
          ],
          "rating": 4.9,
          "available_rooms": 35,
          "price": 18000,
          "image": "https://lh3.googleusercontent.com/proxy/5SoblonEaB10k5pKAAVidGIBFKdPD64Jv5DX7tXpTEM1lvf_w-lnuVNiL6TwA6pDee8qau3Fn1FWqhRUW4jZ_dnQPqwA8IIbeNXBGiOJO6A25TfTeunE9tcDSNVKk74bp9q4n88n-n2ahK2_uuP6IaWb9J22Wg=w287-h192-n-k-rw-no-v1"
      },
      {
          "_id": "66ba3c2aaab9dfe4a31cc033",
          "name": "Spicetree Rajakumari",
          "location": "Chennai, Tamil Nadu",
          "description": "Opulent beachfront hotel with luxurious rooms and fine dining.",
          "amenities": [
              "Free WiFi",
              "Swimming Pool",
              "Spa",
              "Fitness Center",
              "Beachfront"
          ],
          "rating": 4.9,
          "available_rooms": 30,
          "price": 20000,
          "image": "https://lh3.googleusercontent.com/proxy/Iuxsu7H0f3blwhm6jozgsH_7Vdj_3zIXUUQcHDGUamIO-GOdtvk89jnyJdp9VK5EyEegyHPTLGNFfXHKlFElfEp1LP8mOolyEaS-1WpoyQyBnGE1ISLFnBXXMJx-vIqq3eQKH9ABPs2RkUIuSLKzEMAc0aji5Q=w287-h192-n-k-rw-no-v1"
      }
  ]

    setHotels(hotels)
  }, []);

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleSortClick = (event) => setSortAnchorEl(event.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleFilterClose();
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    handleSortClose();
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleBookNow = (hotel) => {
    debugger
    setBookingDetails(prevDetails => ({
      ...prevDetails, // Copy previous details
      totalPrice:hotel.price 
    }));
    const token=localStorage.getItem("token")
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Adjust according to your token payload structure
      console.log("User ID:", userId);
      setBookingDetails(prevDetails => ({
        ...prevDetails, // Copy previous details
        userId: userId   // Update hotelId
      }));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
   
    const hid=hotel["name"]
    setSelectedHotel(hotel);
    setBookingDetails(prevDetails => ({
      ...prevDetails, // Copy previous details
      hotelId: hid    // Update hotelId
    }));
    setOpenBookingDialog(true);
    console.log(bookingDetails);

  };

  const handleReview = (hotel) => {
    setSelectedHotel(hotel);
    setOpenReviewDialog(true);
  };

  const handleCompare = (hotel) => {
    setCompareHotels(prev => [...prev, hotel]);
    if (compareHotels.length === 0) setOpenCompareDialog(true);
  };

  const handleBookingDialogClose = () => {
    setOpenBookingDialog(false);
    setBookingDetails({ guestname: '', startDate: '', endDate: '' });
  };

  const handleReviewDialogClose = () => {
    setOpenReviewDialog(false);
    setReview('');
  };

  const handleCompareDialogClose = () => {
    setOpenCompareDialog(false);
    setCompareHotels([]);
  };

  const handleBookingSubmit = (event) => {
    
    debugger
    event.preventDefault();
    if (selectedHotel) {
      axios.post(`http://localhost:5000/api/bookings/newbook`, bookingDetails)
        .then(() => {
          alert('Booking successful!');
          handleBookingDialogClose();
        })
        .catch(error => alert('Error booking hotel: ' + error.message));
    }
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (selectedHotel) {
      axios.post(`http://localhost:5000/api/hotels/${selectedHotel._id}/reviews`, { review })
        .then(() => {
          alert('Review submitted successfully!');
          handleReviewDialogClose();
        })
        .catch(error => alert('Error submitting review: ' + error.message));
    }
  };

  const filteredHotels = hotels.filter(hotel => 
    (selectedFilter ? hotel.location === selectedFilter : true) && 
    (search ? hotel.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Button
            aria-controls="filter-menu"
            aria-haspopup="true"
            onClick={handleFilterClick}
            startIcon={<FilterListIcon />}
            sx={{ marginRight: 2 }}>
            Filter
          </Button>
          <Menu
            id="filter-menu"
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}>
            <MenuItem onClick={() => handleFilterSelect('Delhi')}>Delhi</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Mumbai')}>Mumbai</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Chennai')}>Chennai</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Kolkata')}>Kolkata</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('')}>Clear Filter</MenuItem>
          </Menu>
          <Button
            aria-controls="sort-menu"
            aria-haspopup="true"
            onClick={handleSortClick}
            startIcon={<SortIcon />}>
            Sort By
          </Button>
          <Menu
            id="sort-menu"
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}>
            <MenuItem onClick={() => handleSortSelect('price')}>Price</MenuItem>
            <MenuItem onClick={() => handleSortSelect('rating')}>Rating</MenuItem>
          </Menu>
        </Box>
        <TextField
          variant="outlined"
          placeholder="Search hotels..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{ width: '300px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {sortedHotels.map(hotel => (
          <StyledCard key={hotel._id}>
            <CardMedia component="img" height="140" image={hotel.image} alt={hotel.name} />
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>{hotel.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>Price: ₹{hotel.price}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>Location: {hotel.location}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>Rating: {hotel.rating}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, gap: 1 }}>
                <LargeBookNowButton variant="contained" onClick={() => handleBookNow(hotel)}>Book Now</LargeBookNowButton>
                <ReviewButton variant="contained" onClick={() => handleReview(hotel)}>Reviews</ReviewButton>
                <CompareButton variant="contained" onClick={() => handleCompare(hotel)}>Compare</CompareButton>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      {/* Booking Dialog */}
      <Dialog open={openBookingDialog} onClose={handleBookingDialogClose} aria-labelledby="booking-dialog-title">
        <DialogTitle id="booking-dialog-title">Book a Room at {selectedHotel?.name}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleBookingSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField margin="dense" label="Guest Name" fullWidth value={bookingDetails.guestname} onChange={e => setBookingDetails({ ...bookingDetails, guestname: e.target.value })} required />
            <TextField label="Phone Number"  value={bookingDetails.phoneNumber} onChange={e => setBookingDetails({ ...bookingDetails, phoneNumber: Number(e.target.value) })} fullWidth sx={{ mb: 2 }} />
            <TextField margin="dense" label="Check-in Date" type="date" fullWidth value={bookingDetails.startDate} onChange={e => setBookingDetails({ ...bookingDetails, startDate: e.target.value })} InputLabelProps={{ shrink: true }} required />
            <TextField margin="dense" label="Check-out Date" type="date" fullWidth value={bookingDetails.endDate} onChange={e => setBookingDetails({ ...bookingDetails, endDate: e.target.value })} InputLabelProps={{ shrink: true }} required />
            <DialogActions>
              <Button onClick={handleBookingDialogClose} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Book Now</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={handleReviewDialogClose} aria-labelledby="review-dialog-title">
        <DialogTitle id="review-dialog-title">Submit Review for {selectedHotel?.name}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleReviewSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField autoFocus margin="dense" label="Review" fullWidth value={review} onChange={e => setReview(e.target.value)} required />
            <DialogActions>
              <Button onClick={handleReviewDialogClose} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog open={openCompareDialog} onClose={handleCompareDialogClose} aria-labelledby="compare-dialog-title">
        <DialogTitle id="compare-dialog-title">Compare Hotels</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {compareHotels.length > 0 ? compareHotels.map(hotel => (
              <Box key={hotel._id} sx={{ mb: 2 }}>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography variant="body2">Price: ₹{hotel.price}</Typography>
                <Typography variant="body2">Location: {hotel.location}</Typography>
                <Typography variant="body2">Rating: {hotel.rating}</Typography>
                <Divider sx={{ my: 2 }} />
              </Box>
            )) : <Typography>No hotels selected for comparison.</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCompareDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelList;
