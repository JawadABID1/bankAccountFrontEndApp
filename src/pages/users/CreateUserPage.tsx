// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// // import { useHistory } from 'react-router-dom';  // For navigation after user creation
// // import { createUser } from '../app/slices/userSlice';  // Redux action for creating a user
// // import { RootState } from '../app/store';  // RootState for accessing Redux state
// // import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components
// //
// // const CreateUserPage: React.FC = () => {
// //     const dispatch = useDispatch();
// //     const history = useHistory();
// //
// //     // Redux state for loading and error handling
// //     const status = useSelector((state: RootState) => state.user.status);
// //     const error = useSelector((state: RootState) => state.user.error);
// //
// //     // Local state for form fields
// //     const [username, setUsername] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [role, setRole] = useState('user');  // Example roles: user, admin
// //
// //     // Handle form submission
// //     const handleSubmit = (event: React.FormEvent) => {
// //         event.preventDefault();
// //
// //         // Dispatch the action to create a new user
// //         const newUser = {
// //             username,
// //             email,
// //             password,
// //             role,
// //         };
// //
// //         dispatch(createUser(newUser)).then((action) => {
// //             // Navigate to the user list page after successful creation
// //             if (action.type === 'user/createUser/fulfilled') {
// //                 history.push('/users');
// //             }
// //         });
// //     };
// //
// //     return (
// //         <Container>
// //             <Row className="justify-content-center mt-5">
// //                 <Col md={6}>
// //                     <h3>Create User</h3>
// //
// //                     {/* Loading spinner */}
// //                     {status === 'loading' && (
// //                         <div className="text-center">
// //                             <Spinner animation="border" />
// //                             <p>Creating user...</p>
// //                         </div>
// //                     )}
// //
// //                     {/* Error alert */}
// //                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
// //
// //                     {/* User creation form */}
// //                     {status !== 'loading' && (
// //                         <Form onSubmit={handleSubmit}>
// //                             <Form.Group controlId="username" className="mb-3">
// //                                 <Form.Label>Username</Form.Label>
// //                                 <Form.Control
// //                                     type="text"
// //                                     placeholder="Enter username"
// //                                     value={username}
// //                                     onChange={(e) => setUsername(e.target.value)}
// //                                     required
// //                                 />
// //                             </Form.Group>
// //
// //                             <Form.Group controlId="email" className="mb-3">
// //                                 <Form.Label>Email</Form.Label>
// //                                 <Form.Control
// //                                     type="email"
// //                                     placeholder="Enter email"
// //                                     value={email}
// //                                     onChange={(e) => setEmail(e.target.value)}
// //                                     required
// //                                 />
// //                             </Form.Group>
// //
// //                             <Form.Group controlId="password" className="mb-3">
// //                                 <Form.Label>Password</Form.Label>
// //                                 <Form.Control
// //                                     type="password"
// //                                     placeholder="Enter password"
// //                                     value={password}
// //                                     onChange={(e) => setPassword(e.target.value)}
// //                                     required
// //                                 />
// //                             </Form.Group>
// //
// //                             <Form.Group controlId="role" className="mb-3">
// //                                 <Form.Label>Role</Form.Label>
// //                                 <Form.Control
// //                                     as="select"
// //                                     value={role}
// //                                     onChange={(e) => setRole(e.target.value)}
// //                                 >
// //                                     <option value="user">User</option>
// //                                     <option value="admin">Admin</option>
// //                                 </Form.Control>
// //                             </Form.Group>
// //
// //                             <Button variant="primary" type="submit" className="w-100">
// //                                 Create User
// //                             </Button>
// //                         </Form>
// //                     )}
// //                 </Col>
// //             </Row>
// //         </Container>
// //     );
// // };
// //
// // export default CreateUserPage;
//
//
//
//
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { useNavigate } from 'react-router-dom';  // For navigation after user creation (updated)
// import { addUser } from '../../app/slices/userSlice.ts';  // Redux action for creating a user
// import { RootState } from '../../app/store.ts';  // RootState for accessing Redux state
// import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components
//
// const CreateUserPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();  // Updated to use navigate
//
//     // Redux state for loading and error handling
//     const status = useSelector((state: RootState) => state.user.status);
//     const error = useSelector((state: RootState) => state.user.error);
//
//     // Local state for form fields
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('user');  // Example roles: user, admin
//
//     // Handle form submission
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//
//         // Dispatch the action to create a new user
//         const newUser = {
//             username,
//             email,
//             password,
//             role,
//         };
//
//         dispatch(addUser(newUser)).then((action) => {
//             // Navigate to the user list page after successful creation
//             if (action.type === 'user/createUser/fulfilled') {
//                 navigate('/users');  // Updated to use navigate
//             }
//         });
//     };
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={6}>
//                     <h3>Create User</h3>
//
//                     {/* Loading spinner */}
//                     {status === 'loading' && (
//                         <div className="text-center">
//                             <Spinner animation="border" />
//                             <p>Creating user...</p>
//                         </div>
//                     )}
//
//                     {/* Error alert */}
//                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
//
//                     {/* User creation form */}
//                     {status !== 'loading' && (
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group controlId="username" className="mb-3">
//                                 <Form.Label>Username</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter username"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="email" className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Enter email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="password" className="mb-3">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Enter password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="role" className="mb-3">
//                                 <Form.Label>Role</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     value={role}
//                                     onChange={(e) => setRole(e.target.value)}
//                                 >
//                                     <option value="user">User</option>
//                                     <option value="admin">Admin</option>
//                                 </Form.Control>
//                             </Form.Group>
//
//                             <Button variant="primary" type="submit" className="w-100">
//                                 Create User
//                             </Button>
//                         </Form>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default CreateUserPage;
//
