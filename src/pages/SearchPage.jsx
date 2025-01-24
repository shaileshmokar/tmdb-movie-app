import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, Image, Placeholder, Button } from 'react-bootstrap';
import { Edit, Trash2, ChevronLeft } from 'lucide-react';
import debounce from 'lodash.debounce';

const formatReleaseDate = (releaseDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(releaseDate);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const searchQuery = params.get('query') || '';
  //   setQuery(searchQuery);

  //   const fetchResults = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`http://localhost:5037/api/Movies?title=${encodeURIComponent(searchQuery)}`);
  //       const data = await response.json();
  //       setResults(data.movies || []);
  //       setTotalCount(data.totalCount || 0);
  //     } catch (error) {
  //       console.error('Error fetching search results:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchResults();
  // }, [location.search]);



  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5037/api/Movies?title=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.movies || []);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((searchQuery) => fetchResults(searchQuery), 1000),
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query') || '';
    setQuery(searchQuery);
    debouncedFetchResults(searchQuery);

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [location.search, debouncedFetchResults]);

  const handleGoBack = () => {
      navigate(-1);
  };

  return (
    <div className="container mt-4">
      <Button variant="secondary mb-2" onClick={handleGoBack}>
          <ChevronLeft size={20} /> Back
      </Button>
      <h4>
        {loading ? (
          <Placeholder animation="wave">
            Search Results for: "<strong>{query}</strong>"
            <Placeholder 
              style={{ width: '20%', height: '1.5rem', backgroundColor: '#e9ecef' }} 
              className="pl-2"
            />
          </Placeholder>
        ) : (
          <>
            Search Results for: "<strong>{query}</strong>" ({totalCount} results found)
          </>
        )}
      </h4>
      <div>
        {loading ? (
          [...Array(5)].map((_, index) => (
            <Card className="mb-3 shadow-sm" key={index}>
              <Card.Body className="d-flex p-1">
                <div className="me-3">
                  <Placeholder as="div" animation="wave" className="rounded" style={{ width: '130px', height: '180px', backgroundColor: '#e9ecef' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <Placeholder as={Card.Title} animation="wave" className="mb-2" style={{ width: '50%', height: '1.5rem', backgroundColor: '#e9ecef' }} />
                  
                  <Placeholder as={Card.Text} animation="wave" className="mb-3">
                    <Placeholder style={{ width: '20%', height: '1rem', backgroundColor: '#e9ecef' }} className="mb-1" />
                  </Placeholder>

                  <Placeholder as={Card.Text} animation="wave" className="mb-3">
                    <Placeholder style={{ width: '100%', height: '1rem', backgroundColor: '#e9ecef' }} className="mb-1" />
                    <Placeholder style={{ width: '100%', height: '1rem', backgroundColor: '#e9ecef' }} />
                    <Placeholder style={{ width: '100%', height: '1rem', backgroundColor: '#e9ecef' }} />
                    <Placeholder style={{ width: '100%', height: '1rem', backgroundColor: '#e9ecef' }} />
                  </Placeholder>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : results.length > 0 ? (
          results.map((result, index) => (
            
              <Card className="mb-1" key={index}>
                <Card.Body className="d-flex p-1">
                  <Link to={`/movies/${result.id}`} key={index} className="text-decoration-none text-dark">
                    <Image
                      src={result.posterPath}
                      alt={result.title}
                      className="me-3 border border-1"
                      rounded
                      style={{
                        width: '130px',
                        height: '180px',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                  <div>
                    <Card.Title className="m-0">
                      <Link to={`/movies/${result.id}`} key={index} className="text-decoration-none text-dark">
                        {result.title}
                      </Link>
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {formatReleaseDate(result.releaseDate)}
                    </Card.Text>
                    <Card.Text className="text-muted m-0 lh-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt. Officiis reprehenderit, sed dolorum soluta adipisci quod doloremque delectus eum asperiores, illum ea ab cupiditate dolore vitae voluptatibus quae neque. Ipsam, deserunt.
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;