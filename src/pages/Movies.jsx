import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import ModalForm from './../components/ModalForm';
import TopListingFilters from './../components/TopListingFilters';
import SidebarFilters from './../components/SidebarFilters';
import MovieCardGrid from './../components/MovieCardGrid';
import PaginationComponent from './../components/PaginationComponent';
import MoviesTable from '../components/MoviesTable';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  // const [filters, setFilters] = useState({ perPage: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [startEntry, setStartEntry] = useState(1);
  const [endEntry, setEndEntry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    perPage: '',
    sortOrder: 'ASC',
    sortBy: 'Title',
    genreId: ''
  })

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with actual API call
        // const response = await fetch(`http://localhost:5037/api/movies?currentPage=${currentPage}&perPage=${filters.perPage}`);
        const response = await fetch(`http://localhost:5037/api/Movies?sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&currentPage=${currentPage}&perPage=${filters.perPage || 10}&genreId=${filters.genreId}`);
        const data = await response.json();
        setMovies(data.movies || []);
        setTotalPages(data.totalPages || 0);
        setTotalCount(data.totalCount || 0);
        setStartEntry(data.startEntry || 1);
        setEndEntry(data.endEntry || 0);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // fetchGenres();
  }, [filters, currentPage]);

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
    if (name === 'reset') {
      console.log('RESET clicked');
      setFilters({
        perPage: 10,
        sortOrder: 'ASC',
        sortBy: 'Title',
        genreId: '',
      });
      setCurrentPage(1);
      return;
    }
  
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (currentPage) => setCurrentPage(currentPage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Add Movie Section */}
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

      {/* Movies Grid Section */}
      <Container className="mt-4">
        <Row className="gy-4">
          <Col md={3}>
            <SidebarFilters
              filters={filters}
              genres={genres}
              onFilterChange={handleFilterChange}
            />
          </Col>

          <Col md={9}>
            {/* <CardGrid cardCount={8} />  */}
            {error ? 
              <div>Error: {error}</div>
              : <MovieCardGrid movies={movies} loading={loading} cardCount={filters.perPage || 8} perRowCount={4} />
            }

            <Col md={12} className='mt-2'>
            {!error &&
              <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              startEntry={startEntry}
              endEntry={endEntry}
              onPageChange={handlePageChange}
              />
            }
            </Col>
        
          </Col>
        </Row>
      </Container>

      {/* Pagination Section */}
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

        <div className="container mt-4">
          <h1>Movies</h1>
          <MoviesTable movies={movies} />
        </div>
    </>
  );
};

export default Movies;