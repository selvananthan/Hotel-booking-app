import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const sampleBlogs = [
  {
    title: 'The Ultimate Guide to Booking Hotels',
    date: 'August 10, 2024',
    content: 'Learn how to book the best hotels with our comprehensive guide. From tips on finding the best deals to understanding hotel ratings, we’ve got you covered.'
  },
  {
    title: 'Top 10 Hotel Destinations for 2024',
    date: 'August 5, 2024',
    content: 'Discover the top 10 hotel destinations you should visit in 2024. From bustling cities to tranquil retreats, explore the best places to stay around the world.'
  },
  {
    title: 'How to Choose the Perfect Hotel Room',
    date: 'July 28, 2024',
    content: 'Choosing the right hotel room can make or break your stay. Find out how to select a room that fits your needs and ensures a comfortable and enjoyable experience.'
  }
];

const BlogContent = () => {
  return (
    <Container sx={{ py: 4, maxWidth: 'md' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#1976d2', fontWeight: 'bold' }}>
        Blog
      </Typography>
      {sampleBlogs.map((blog, index) => (
        <Paper key={index} elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            {blog.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
            {blog.date}
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            {blog.content}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default BlogContent;

