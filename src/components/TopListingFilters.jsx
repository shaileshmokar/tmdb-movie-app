import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const TopListingFilters = () => {
  return (
    <>
      <Row xs={1} sm={2} md={5} className="justify-content-md-end align-items-center">
        <Col>
            <Form.Select aria-label={`Dropdown`}>
              <option>Per Page</option>
              <option value="2">1</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="10">20</option>
              <option value="10">30</option>
              <option value="10">50</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select aria-label={`Dropdown`}>
              <option>Order</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Select aria-label={`Dropdown`}>
              <option>Sort By</option>
              <option value="ASC">Title</option>
              <option value="DESC">Release Date</option>
              <option value="DESC">Duration</option>
            </Form.Select>
          </Col>
      </Row>
      
    </>
  )
}

export default TopListingFilters