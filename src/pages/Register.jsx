import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {   
            name: '',
            username: '',
            email: '',
            role: '',
            photo: '',
            password: '',
            confirmPassword: ''
        }
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setFormData((prev) => ({ ...prev, photo: base64String }));
        };
        reader.readAsDataURL(file);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5037/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success(`Registration successful!`);
            navigate('/auth/login');
        } else {
            toast.error(`Error during registration.`);
        }
    };

    return (
        <Container className="justify-content-center align-items-center mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="p-4">
                        <h3>Register</h3>
                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRole" className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    placeholder="Enter role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                />

                                {/* <Form.Select aria-label="Default select example">
                                    <option>Role</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> */}

                            </Form.Group>
                            <Form.Group controlId="formPhoto" className="mb-3">
                                <Form.Label>Photo</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    name="photo"
                                    placeholder="Enter photo"
                                    value={formData.photo}
                                    onChange={handleInputChange}
                                /> */}
                                <Form.Control 
                                    type="file" 
                                    name="photo"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Register</Button>
                        </Form>
                        <p className="mt-3">
                            Already have an account? <Link to="/auth/login" className="text-primary fw-bold">Login</Link>
                        </p>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    );
};

export default Register;