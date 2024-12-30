import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';

const MovieCardGrid = ({ movies, loading, cardCount = 8 }) => {
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
                                  </Card.Body>
                              </Card>
                          </Col>
                      ))
                    : movies.slice(0, cardCount).map((movie) => (
                        <Col key={movie.id}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={movie.posterPath || 'https://placehold.co/110x150'}
                                    alt={movie.title}
                                    width="200"
                                    height="326"
                                />
                                <Card.Body>
                                    <Card.Title className="fs-5 fw-bold">{movie.title}</Card.Title>
                                    <Card.Text>
                                        { movie.genre?.name } <br/>
                                        { movie.releaseDate}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default MovieCardGrid;