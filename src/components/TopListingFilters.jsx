import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const TopListingFilters = ({ onFilterChange, genres}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <>
      <Row xs={1} sm={2} md={5} className="justify-content-md-end align-items-center">
        <Col>
            <Form.Select aria-label="per Page" name="perPage" onChange={handleFilterChange}>              
              <option value="5">Per Page</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select aria-label="order" name="sortOrder" onChange={handleFilterChange}>
              <option>Order</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select aria-label="sort By" name="sortBy" onChange={handleFilterChange}>
              <option>Sort By</option>
              <option value="Title">Title</option>
              <option value="ReleaseDate">Release Date</option>
              <option value="Duration">Duration</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select aria-label="Genre" name="genreId" onChange={handleFilterChange}>
              <option value="">Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </Form.Select>
          </Col>
      </Row>
      
    </>
  )
}

export default TopListingFilters