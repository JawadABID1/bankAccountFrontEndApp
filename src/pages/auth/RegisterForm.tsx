// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';  // For routing
// // import { reg } from '../app/slices/authSlice';  // Assuming you have an authSlice
// import {registerUser} from "../../app/slices/authSlice.ts";
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';  // Import Bootstrap components
//
// const RegisterForm: React.FC = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     const handleRegister = (e: React.FormEvent) => {
//         e.preventDefault();
//
//         // Example validation
//         if (!name || !email || !password || !confirmPassword) {
//             setError('Please fill in all fields.');
//             return;
//         }
//
//         if (password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }
//
//         // Example registration logic (replace with your API call)
//         const user = { name, email };
//
//         // Dispatch the registration action (you can replace this with your actual registration logic)
//         dispatch(registerUser(user));
//
//         // Redirect to dashboard after successful registration
//         navigate('/dashboard');
//     };
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={6}>
//                     <h2>Register</h2>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <Form onSubmit={handleRegister}>
//                         <Form.Group controlId="name">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group controlId="email" className="mt-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group controlId="password" className="mt-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="Enter password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group controlId="confirmPassword" className="mt-3">
//                             <Form.Label>Confirm Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="Confirm password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Button variant="primary" type="submit" className="mt-3">
//                             Register
//                         </Button>
//                     </Form>
//                     <p className="mt-3">
//                         Already have an account? <a href="/login">Login here</a>
//                     </p>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default RegisterForm;
