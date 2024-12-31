import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalForm = ({ show, handleClose, genres }) => {
    const [validated, setValidated] = useState(false);
    const [movie, setMovie] = useState({
        title: "",
        releaseDate: "",
        duration: "",
        genreId: "",
        posterPath: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prevMovie) => ({...prevMovie, [name]: value }));
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                const response = await fetch('http://localhost:5037/api/Movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie),
                });

                if(response.ok) {
                    toast.success("Movie added successfully!");
                    // refetchMovies();
                    handleClose();
                    setValidated(false);
                } else {
                    toast.error("Failed to add movie!", response.statusText);
                }

                setMovie({
                    title: "",
                    releaseDate: "",
                    duration: "",
                    genreId: "",
                    posterPath: ""
                });
            } catch (error) {
                toast.error('Error submitting data', error);
            }            
        }
        setValidated(true);
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Movie</Modal.Title>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row xs={1} md={1} className="m-2">
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                <Form.Label>Title</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter a movie title"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please add a movie title. <br />
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row xs={1} md={2} className="m-2">
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="releaseDate"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select a release date
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="duration"
                                    placeholder="Enter Duration"
                                    min='0'
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add a duration
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row xs={1} md={2} className="m-2">
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Genre</Form.Label>
                                {/* <Form.Control
                                    type="number"
                                    name="genreId"
                                    placeholder="Enter Genre"
                                    min='0'
                                    onChange={handleChange}
                                    required
                                /> */}
                                <Form.Select 
                                    name="genreId"
                                    aria-label={`Genre`}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please add a genre
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Poster</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="posterPath"
                                    placeholder="Enter Poster Link"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add a poster
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* <Row xs={1} md={2} className="m-2">
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    defaultValue="Mark"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    defaultValue="Otto"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row xs={1} md={3} className="m-2">
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} md="12" controlId="validationCustom05">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text" placeholder="Zip" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row xs={1} md={1} className="m-2">
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                        </Col>
                    </Row> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit">Save Movie</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalForm;