import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5037/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            if(data.user) {
                toast.success(`Welcome ${data.user.username}!`);
            } else {
                toast.success(`Welcome User!`);
            }
            
            // const loggedInUser = response.data;
            localStorage.setItem('user', data.user);
            setUser(data.user);
            navigate('/');
        } else {
            toast.error(`Invalid credentials.`);
        }
    };

    return (
        <Container className="justify-content-center align-items-center mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="p-4">
                        <h3>Login</h3>
                        <Form onSubmit={handleLogin}>
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
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                        <p className="mt-3">
                            Don't have an account? <Link to="/auth/register" className='text-primary fw-bold'>Register</Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;