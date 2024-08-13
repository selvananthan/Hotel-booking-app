import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Footer from './Footer'; // Adjust the import path as needed

const HotelDetails = () => {
    const { id } = useParams(); // Extract the hotel ID from the URL
    const [hotel, setHotel] = useState({}); // State to store hotel details
    const [reviews, setReviews] = useState([]); // State to store reviews

    useEffect(() => {
        // Fetch hotel details by ID
        axios.get(`http://localhost:5000/api/hotels/${id}`)
            .then(response => setHotel(response.data))
            .catch(error => console.error("There was an error fetching the hotel details!", error));

        // Fetch reviews for the specific hotel by hotel ID
        axios.get(`http://localhost:5000/api/reviews/${id}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error("There was an error fetching the reviews!", error));
    }, [id]);

    return (
        <div>
            <Container sx={{ py: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" gutterBottom>{hotel.name}</Typography>
                    <Typography variant="h6">Price: ₹{hotel.price_per_night}</Typography>
                    <Typography variant="body1">{hotel.location}</Typography>
                    <Typography variant="body2">{hotel.amenities?.join(', ')}</Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Typography variant="h5" style={{ marginTop: '20px' }}>Reviews</Typography>
                    <Grid container spacing={3}>
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="body1">{review.reviewText}</Typography>
                                            <Typography variant="body2">Rating: {review.rating}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </motion.div>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
            <Footer /> {/* Include the Footer component */}
        </div>
    );
};

export default HotelDetails;
