import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import NavbarComponent from './components/NavbarComponent';
import CarouselComponent from './components/CarouselComponent';
// import CardGrid from './components/Cardgrid';
import MovieCardGrid from './components/MovieCardGrid';
import SidebarFilters from './components/SidebarFilters';
import TopListingFilters from './components/TopListingFilters';
import ModalForm from './components/ModalForm';
import { Plus } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';
// import './App.css'
// import './assets/css/custom.scss';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;

      if(width > 1200) {
        setImageSrc('https://placehold.co/1500x600');
      } else if(width > 768) {
        setImageSrc('https://placehold.co/1200x600');
      } else {
        setImageSrc('https://placehold.co/800x500');
      }
    };

    updateImage();

    window.addEventListener('resize', updateImage);

    return () => window.removeEventListener('resize', updateImage);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
        const url = 'http://localhost:5037/api/Movies';
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            setError('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    };

    fetchMovies();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavbarComponent />
      {/* <CarouselComponent imageSrc={imageSrc}/> */}

      {/* <Container className="mt-4">
        <Button variant="primary" onClick={handleShow}>
          <Plus size={20} /> Movie
        </Button>

        <ModalForm show={show} handleClose={handleClose} />
      </Container> */}
      
      <Container className="mt-4">
        <Row className="gy-4">
          <Col md={3}>
            <Button variant="primary" onClick={handleShow}>
              <Plus size={20} /> Movie
            </Button>
            {/* <ModalForm show={show} handleClose={handleClose} refetchMovies={fetchMovies} /> */}
            <ModalForm show={show} handleClose={handleClose} />
          </Col>

          <Col md={9}>
            <TopListingFilters />
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Row className="gy-4">
          {/* <Col md={3}> */}
            {/* <SidebarFilters /> */}
          {/* </Col> */}

          <Col md={12}>
            {/* <CardGrid cardCount={8} />  */}
            {error && <div>Error: {error}</div>}
            <MovieCardGrid movies={movies} loading={loading} cardCount={8} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App