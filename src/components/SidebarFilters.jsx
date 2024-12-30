import React from 'react';
import { Accordion, Form } from 'react-bootstrap';

const SidebarFilters = () => {
    return (
        <>
            {['Sort', 'Filter', 'Where To Watch'].map((title, index) => (
                <Accordion className="mb-3">
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{title}</Accordion.Header>
                        <Accordion.Body>
                        <Form.Select className="mb-3" aria-label={`Select ${title}`}>
                            <option>{`Choose ${title}`}</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </Form.Select>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </>
    );
};

export default SidebarFilters;