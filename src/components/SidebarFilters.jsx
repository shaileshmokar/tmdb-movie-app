import React from 'react';
import { Form, Button, Accordion, InputGroup } from 'react-bootstrap';

const SidebarFilters = ({ filters, genres, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="sidebar-filters p-3 bg-light rounded">
      <h5>Filters</h5>

      <Accordion alwaysOpen className="mt-3">
        {/* Genres Filter */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genres</Accordion.Header>
          <Accordion.Body>
            {genres.map((genre) => (
              <Form.Check
                key={genre.id}
                type="checkbox"
                id={`genre-${genre.id}`}
                name="genreId"
                label={genre.name}
                value={genre.id}
                onChange={handleFilterChange}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Per Page Filter */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Per Page</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="perPage"
              onChange={handleFilterChange}
              defaultValue={filters.perPage || 10}
            >
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
          </Accordion.Body>
        </Accordion.Item>

        {/* Sort By Filter */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Sort By</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="sortBy"
              onChange={handleFilterChange}
              defaultValue={filters.sortBy || 'Title'}
            >
                <option value="Title">Title</option>
                <option value="ReleaseDate">Release Date</option>
                <option value="Duration">Duration</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Order Filter */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>Order</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              name="sortOrder"
              onChange={handleFilterChange}
              defaultValue={filters.order || 'ASC'}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Rating Filter */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Rating</Accordion.Header>
          <Accordion.Body>
            <Form.Range
              name="rating"
              min="0"
              max="10"
              step="1"
              onChange={handleInputChange}
              defaultValue={filters.rating || 0}
            />
            <div className="d-flex justify-content-between">
              <span>0</span>
              <span>10</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Release Year Filter */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Release Year</Accordion.Header>
          <Accordion.Body>
            <InputGroup>
              <Form.Control
                type="year"
                placeholder="From"
                name="releaseDateStart"
                onChange={handleInputChange}
              />
              <Form.Control
                type="year"
                placeholder="To"
                name="releaseDateEnd"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Reset Filters */}
      <Button
        variant="secondary"
        className="mt-3 w-100"
        onClick={() => onFilterChange('reset', true)}
        name="reset"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SidebarFilters;