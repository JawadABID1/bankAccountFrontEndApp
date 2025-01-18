// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { useParams, Link } from 'react-router-dom';  // For routing
// import { RootState } from '../app/store';  // RootState for accessing Redux state
// // import { fetchUserById } from '../app/slices/userSlice';  // Redux action to fetch user details
// import {getUserById} from "../../app/slices/userSlice.ts"; // Redux action to fetch user details
// import { Container, Row, Col, Spinner, Alert, Button, Card } from 'react-bootstrap';  // Bootstrap components
//
// const UserDetails: React.FC = () => {
//     const { id } = useParams<{ id: string }>();  // Retrieve user ID from route params
//     const dispatch = useDispatch();
//
//     // Redux state for user details, loading, and error messages
//     const user = useSelector((state: RootState) => state.user.selectedUser);
//     const status = useSelector((state: RootState) => state.user.status);
//     const error = useSelector((state: RootState) => state.user.error);
//
//     // Fetch user details when component mounts or ID changes
//     useEffect(() => {
//         if (id) {
//             dispatch(getUserById(id));  // Dispatch the fetch action
//         }
//     }, [dispatch, id]);
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={8}>
//                     <h3>User Details</h3>
//
//                     {/* Loading state */}
//                     {status === 'loading' && (
//                         <div className="text-center">
//                             <Spinner animation="border" />
//                             <p>Loading user details...</p>
//                         </div>
//                     )}
//
//                     {/* Error state */}
//                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
//
//                     {/* Display user details if data is fetched */}
//                     {status === 'succeeded' && user && (
//                         <Card>
//                             <Card.Body>
//                                 <h5 className="card-title">{user.name}</h5>
//                                 <p className="card-text">
//                                     <strong>Email:</strong> {user.email}
//                                 </p>
//                                 <p className="card-text">
//                                     <strong>Phone:</strong> {user.phone}
//                                 </p>
//                                 <p className="card-text">
//                                     <strong>Role:</strong> {user.role}
//                                 </p>
//                                 <p className="card-text">
//                                     <strong>Status:</strong> {user.status}
//                                 </p>
//
//                                 <Link to={`/users/edit/${user.id}`} className="btn btn-warning mr-2">
//                                     Edit
//                                 </Link>
//                                 <Link to="/users" className="btn btn-secondary">
//                                     Back to List
//                                 </Link>
//                             </Card.Body>
//                         </Card>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default UserDetails;
