// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { useParams, useHistory } from 'react-router-dom';  // For routing
// import { RootState } from '../app/store';  // RootState for accessing Redux state
// import { fetchUserById } from '../app/slices/userSlice';  // Redux action to fetch user details
// import { createUser, updateUser } from '../app/slices/userSlice';  // Redux actions for creating and updating user
// import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components
//
// const UserForm: React.FC = () => {
//     const { id } = useParams<{ id: string }>();  // Get user ID from route params if editing
//     const dispatch = useDispatch();
//     const history = useHistory();
//
//     // Redux state for user details, form submission status, and error messages
//     const user = useSelector((state: RootState) => state.user.selectedUser);
//     const status = useSelector((state: RootState) => state.user.status);
//     const error = useSelector((state: RootState) => state.user.error);
//
//     // Local state for form inputs
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [role, setRole] = useState('');
//     const [statusValue, setStatusValue] = useState('');
//
//     // Fetch user details if editing
//     useEffect(() => {
//         if (id) {
//             dispatch(fetchUserById(id));  // Fetch user details by ID for editing
//         }
//     }, [dispatch, id]);
//
//     // Initialize form fields if editing
//     useEffect(() => {
//         if (user && id) {
//             setName(user.name);
//             setEmail(user.email);
//             setPhone(user.phone);
//             setRole(user.role);
//             setStatusValue(user.status);
//         }
//     }, [user, id]);
//
//     // Handle form submission
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//
//         // Create or update user depending on the presence of user ID
//         const userData = { name, email, phone, role, status: statusValue };
//
//         if (id) {
//             dispatch(updateUser({ id, userData }));
//         } else {
//             dispatch(createUser(userData));
//         }
//     };
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={8}>
//                     <h3>{id ? 'Edit User' : 'Create User'}</h3>
//
//                     {/* Loading state */}
//                     {status === 'loading' && (
//                         <div className="text-center">
//                             <Spinner animation="border" />
//                             <p>Submitting...</p>
//                         </div>
//                     )}
//
//                     {/* Error state */}
//                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
//
//                     <Form onSubmit={handleSubmit}>
//                         {/* Name field */}
//                         <Form.Group controlId="name">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//
//                         {/* Email field */}
//                         <Form.Group controlId="email">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//
//                         {/* Phone field */}
//                         <Form.Group controlId="phone">
//                             <Form.Label>Phone</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter phone number"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         {/* Role field */}
//                         <Form.Group controlId="role">
//                             <Form.Label>Role</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select role</option>
//                                 <option value="Admin">Admin</option>
//                                 <option value="User">User</option>
//                             </Form.Control>
//                         </Form.Group>
//
//                         {/* Status field */}
//                         <Form.Group controlId="status">
//                             <Form.Label>Status</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={statusValue}
//                                 onChange={(e) => setStatusValue(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select status</option>
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                             </Form.Control>
//                         </Form.Group>
//
//                         <Button variant="primary" type="submit" className="mt-3">
//                             {id ? 'Update User' : 'Create User'}
//                         </Button>
//                     </Form>
//
//                     {/* Back to List button */}
//                     <Button
//                         variant="secondary"
//                         className="mt-3 ms-2"
//                         onClick={() => history.push('/users')}
//                     >
//                         Back to User List
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default UserForm;
