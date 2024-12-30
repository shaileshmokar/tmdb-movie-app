import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Placeholder } from 'react-bootstrap';
import axios from 'axios';

const CardGrid = ({ cardCount = 8 }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const apiKey = '37ba48531e717000311c7d564fc85763';
    // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=2`;

    const url = `http://localhost:5037/api/Movies`;

    useEffect(() => {
        const fetchMovies = async() => {
            try {
                const response = await axios.get(url);
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch movies');
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

        // if (loading) {
        //     return <div>Loading...</div>;
        // }

        // if (error) {
        //     return <div>{error}</div>;
        // }

    // return (
    //     <Container className="">
    //         <Row xs={1} md={4} className="gy-4">
    //         {/* <Row xs={1} sm={2} m={4} className="g-4"> */}
    //             {Array.from({ length: cardCount }).map((_, idx) => (
    //             <Col key={idx}>
    //                 <Card className="h-100">
    //                     <Card.Img variant="top" src="https://placehold.co/100x150" />
    //                     {/* <Card.Body>
    //                         <Card.Title>Card title</Card.Title>
    //                         <Card.Text>
    //                         This is a longer card with supporting text below as a natural
    //                         lead-in to additional content.
    //                         </Card.Text>
    //                         <Button variant="primary">Go somewhere</Button>
    //                     </Card.Body> */}
    //                 </Card>
    //             </Col>
    //             ))}
    //         </Row>
    //     </Container>
    // );

    return (
        <Container> 
            <Row xs={1} sm={2} md={5} className="gy-4">
                {loading
                    ? Array.from({ length: cardCount }).map((_, idx) => (
                          <Col key={idx}>
                              <Card className="h-100">
                                  <Card.Img
                                      variant="top"
                                      src="https://placehold.co/100x150"
                                      alt="Placeholder"
                                      animation="glow"
                                  />
                                  <Card.Body>
                                      <Placeholder as={Card.Title} animation="glow">
                                          <Placeholder xs={6} />
                                      </Placeholder>
                                      {/* <Placeholder as={Card.Text} animation="glow">
                                          <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                                          <Placeholder xs={4} /> <Placeholder xs={6} />
                                      </Placeholder>
                                      <Placeholder.Button variant="primary" xs={6} /> */}
                                  </Card.Body>
                              </Card>
                          </Col>
                      ))
                : movies.slice(0, cardCount).map((movie) => (
                    <Col key={movie.id}>
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Construct the image URL
                                alt={movie.title}
                            />
                            <Card.Body>
                                <Card.Title className='fs-6 fw-bold '>{movie.title}</Card.Title>
                                {/* <Card.Text>{movie.overview}</Card.Text>
                                <Button variant="primary" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">
                                    View More
                                </Button> */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardGrid;