import React from 'react';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
// import Holder from 'holderjs';

const MovieCardGrid = ({ movies, loading, cardCount = 5 }) => {
    // useEffect(() => {
    //     // Initialize Holder.js for dynamically loaded images
    //     if (loading) {
    //         Holder.run();
    //     }
    // }, [loading]);

    return (
        // <CSSTransition
        //     in={!loading}
        //     timeout={5000}
        //     classNames="fade"
        //     unmountOnExit
        // >
        //<Container> 
            <Row xs={1} sm={2} md={5} className="gy-4">
                
                {loading
                    ?   Array.from({ length: cardCount }).map((_, idx) => (
                            <Col key={idx}>
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src="https://placehold.co/100x150"
                                        alt="Placeholder"
                                        animation="wave"
                                        width="220"
                                        height="326"
                                    />
                                    {/* <Card.Img
                                        variant="top"
                                        src="data:image/svg+xml,..."
                                        alt="Placeholder"
                                        width="220"
                                        height="326"
                                        data-src="https://via.placeholder.com/220x326"
                                    /> */}
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}

                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    : movies.slice(0, cardCount).map((movie) => (
                        <Col key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={movie.posterPath || 'https://placehold.co/110x150'}
                                        alt={movie.title}
                                        width="200"
                                        height="326"
                                    />
                                    <Card.Body className="text-decoration-none">
                                        <Card.Title className="fs-5 fw-bold">{movie.title}</Card.Title>
                                        <Card.Text className="fs-6 fw-lighter">
                                            Genre: { movie.genre?.name } <br/>
                                            Release On: { movie.releaseDate} <br/>
                                            Duration: { movie.duration } Mins
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
                
            </Row>
        //</Container>
        // </CSSTransition>
    );
};

export default MovieCardGrid;