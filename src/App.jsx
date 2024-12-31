import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { ToastContainer } from 'react-toastify';

import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home';
import About from './pages/About';
import MovieDetails from './components/MovieDetails';
import './styles.css';
import './index.css';


function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/movies" element={<Movies />} />*/}
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App