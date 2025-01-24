import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import reactLogo from './../assets/react.svg'
import viteLogo from '/vite.svg'

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import NavbarComponent from './../components/NavbarComponent';
import CarouselComponent from './../components/CarouselComponent';
// import CardGrid from './components/Cardgrid';
import MovieCardGrid from './../components/MovieCardGrid';
import SidebarFilters from './../components/SidebarFilters';
import TopListingFilters from './../components/TopListingFilters';
import ModalForm from './../components/ModalForm';
import AddMovie from './../components/AddMovie';
import { Plus } from 'lucide-react';

import PaginationComponent from './../components/PaginationComponent';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// // import 'swiper/css/effect-fade';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

import './../styles.css';
import MultiCarousel from './../components/MultiCarousel';
import ImgOverlay from '../components/ImgOverlay';
// import './App.css'
// import './../assets/css/custom.scss';
import './../custom.scss' 

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [startEntry, setStartEntry] = useState(1);
  const [endEntry, setEndEntry] = useState(1);

  const [filters, setFilters] = useState({
    perPage: '',
    sortOrder: '',
    sortBy: '',
    genreId: ''
  })

  const [genres, setGenres] = useState([]);

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
    const timer = setTimeout(() => setCurrentPage(1), 300);
    return () => clearTimeout(timer);
  }, [filters.perPage]);

  useEffect(() => {
    const fetchMovies = async (currentPage = 1) => {
        setLoading(true);
        // const url = 'http://localhost:5037/api/Movies';
        const url = `http://localhost:5037/api/Movies?sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&currentPage=${currentPage}&perPage=${filters.perPage || 5}&genreId=${filters.genreId}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          setMovies(data.movies);
          // setFilteredMovies(data);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
          setTotalCount(data.totalCount);
          setStartEntry(data.startEntry);
          setEndEntry(data.endEntry);
        } catch (error) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
    };

    fetchMovies(currentPage);
  }, [currentPage, filters]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5037/api/genres');
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };
  
    fetchGenres();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (currentPage) => setCurrentPage(currentPage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ImgOverlay />
      {/* <CarouselComponent imageSrc={imageSrc}/> */}
      {/* <CarouselComponent /> */}

      {/* <MultiCarousel 
        // width={200}
        // height={326}
        // slidesToShow={6} 
        // slidesToScroll={5} 
        size={"large"}
        slideType={"large"}
        speed={800}
        autoplay={true}
        autoplaySpeed={2500}
        cssEase={"ease-in-out"}
      /> */}

      <div className="container mt-2">
        {/* <h4>Trending</h4> */}
        {/* <div className="d-flex align-items-center justify-content-between">
          <h4>Trending</h4>
          <div className="filter-options d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => handleFilter("today")}>
              Today
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => handleFilter("week")}>
              This Week
            </button>
          </div>
        </div> */}
        
        <MultiCarousel 
          // width={150}
          // height={226}
          // width={220}
          // height={326}
          // slidesToShow={5} 
          // slidesToScroll={5} 
          size={"medium"}
          slideType={"medium"}
          speed={1000}
          autoplay={true}
          autoplaySpeed={3000}
          cssEase={"ease-in-out"}
        />
      </div>

      {/* <div className="container mt-2">
        <MultiCarousel 
          // width={100}
          // height={166}
          // slidesToShow={12} 
          // slidesToScroll={5} 
          size={"small"}
          slideType={"small"}
          speed={600}
          autoplay={true}
          autoplaySpeed={2000}
          cssEase={"ease-in-out"}
        />
      </div> */}

      {/* <Container className="mt-4">
        <Button variant="primary" onClick={handleShow}>
          <Plus size={20} /> Movie
        </Button>

        <ModalForm show={show} handleClose={handleClose} />
      </Container> */}
      
      {/* <ModalForm show={show} handleClose={handleClose} refetchMovies={fetchMovies} /> */}
      {/* <Container className="mt-4">
        <Row className="gy-4">
          <Col md={3}>
            <Button variant="primary" onClick={handleShow}>
              <Plus size={20} /> Movie
            </Button>
            
            <ModalForm show={show} handleClose={handleClose} genres={genres} />
          </Col>

          <Col md={9}>
            <TopListingFilters onFilterChange={handleFilterChange} genres={genres} />
          </Col>
        </Row>
      </Container> */}

      {/* <Container className="mt-4">
        <Row className="gy-4">
          <Col md={3}>
            <AddMovie />
          </Col>
          <Col md={9}>
            <TopListingFilters onFilterChange={handleFilterChange} genres={genres} />
          </Col>
        </Row>
      </Container> */}

      {/* <Container className="mt-4"> */}
        {/* <Row className="gy-4"> */}
          {/* <Col md={3}> */}
            {/* <SidebarFilters /> */}
          {/* </Col> */}

          {/* <Col md={12}> */}
            {/* <CardGrid cardCount={8} />  */}
            {/* {error ?  */}
              {/* <div>Error: {error}</div> */}
              {/* : <MovieCardGrid movies={movies} loading={loading} cardCount={filters.perPage || 5} /> */}
            {/* } */}
          {/* </Col> */}
        {/* </Row> */}
      {/* </Container> */}

      {/* <Container className="mt-4 d-flex justify-content-end"> */}
      {/* <Container className="mt-2">
        <PaginationComponent 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalCount={totalCount} 
            startEntry={startEntry} 
            endEntry={endEntry} 
            onPageChange={handlePageChange} 
        />
      </Container> */}
    </>
  )
}

export default App