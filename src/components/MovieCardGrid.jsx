import React from 'react';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import CarouselMovieCardPlaceholder from './cards/CarouselMovieCardPlaceholder';
// import Holder from 'holderjs';

const MovieCardGrid = ({ movies, loading, cardCount = 5, perRowCount = 5 }) => {
    // useEffect(() => {
    //     // Initialize Holder.js for dynamically loaded images
    //     if (loading) {
    //         Holder.run();
    //     }
    // }, [loading]);

    const cardStyle = {
        transition: 'box-shadow 0.3s, border-color 0.3s',
        overflow: 'hidden',
    };

    const cardHoverStyle = {
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #0b3150',
    };

    return (
        // <CSSTransition
        //     in={!loading}
        //     timeout={5000}
        //     classNames="fade"
        //     unmountOnExit
        // >
        //<Container> 
            <Row xs={1} sm={2} md={perRowCount} className="gy-4">
                
                {loading
                    ?   Array.from({ length: cardCount }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={cardStyle} className="h-100">
                                    <Placeholder as={Card.Image} animation="glow">
                                        <Placeholder
                                            style={{
                                                width: `220px`,
                                                height: `326px`,
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                marginBottom: "0px",
                                            }}
                                            className="p-1"
                                        />
                                    </Placeholder>
                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation="wave">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="wave">
                                            <Placeholder xs={7} /> 
                                            <Placeholder xs={4} /> 
                                            <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> 
                                        </Placeholder>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    : movies.slice(0, cardCount).map((movie) => (
                        <Col key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <Card 
                                    style={cardStyle} 
                                    className="h-100"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                                        e.currentTarget.style.border = cardHoverStyle.border;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '';
                                        e.currentTarget.style.border = '';
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={movie.posterPath || 'https://placehold.co/110x150'}
                                        alt={movie.title}
                                        width="220"
                                        height="326"
                                    />
                                    <Card.Body className="text-decoration-none">
                                        <Card.Title className="fs-5 fw-bold m-0">{movie.title}</Card.Title>
                                        <Card.Text className="fs-6 fw-lighter">
                                            {/* Genre: { movie.genre?.name } <br/> */}
                                            Release On: { movie.releaseDate} <br/>
                                            {/* Duration: { movie.duration } Mins */}
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