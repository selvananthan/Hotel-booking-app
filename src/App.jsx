// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeContent from './components/HomeContent';
import HotelList from './components/HotelList';
import BlogContent from './components/BlogContent';
import HotelBooking from './components/HotelBooking';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id/book" element={<HotelBooking />} />
        <Route path="/blog" element={<BlogContent />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
