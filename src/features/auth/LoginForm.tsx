import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // For routing
// import { setUser } from '../app/slices/authSlice';  // Assuming you have an authSlice
import {setUser} from "../../app/slices/userSlice.ts";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';  // Import Bootstrap components

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Example validation (can be replaced with your own logic)
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        // Example login logic (replace with your API call)
        const user = { name: 'John Doe', email };

        // Dispatch the login action (you can replace this with your actual authentication logic)
        dispatch(setUser(user));

        // Redirect to dashboard after successful login
        navigate('/dashboard');
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2>Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Login
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
