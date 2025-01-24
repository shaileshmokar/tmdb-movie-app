import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { ToastContainer } from 'react-toastify';

import NavbarComponent from './components/NavbarComponent';
import CarouselComponent from './components/CarouselComponent';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import MovieDetails from './components/MovieDetails';
import SearchPage from './pages/SearchPage';
import Movies from './pages/Movies';
// import './styles.css';
import './index.css';
//import './custom.scss';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App