// import React, { useEffect, useState } from 'react';
// import { Table, Button, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';  // For routing links
// import { useAppDispatch, useAppSelector } from '../app/hooks';  // For accessing Redux state
// import { getAllUsers } from '../app/slices/userSlice';  // Import the action to fetch users
//
// const UsersPage: React.FC = () => {
//     // Redux state
//     const dispatch = useAppDispatch();
//     const users = useAppSelector((state) => state.user.users);
//     const loading = useAppSelector((state) => state.user.loading);
//     const error = useAppSelector((state) => state.user.error);
//
//     // Fetch users on component mount
//     useEffect(() => {
//         dispatch(getAllUsers());
//     }, [dispatch]);
//
//     return (
//         <Container className="mt-5">
//             <Row>
//                 <Col md={12}>
//                     <h2>Users</h2>
//                     {loading && <p>Loading users...</p>}
//                     {error && <p className="text-danger">Error: {error}</p>}
//
//                     <Button variant="primary" as={Link} to="/create-user" className="mb-3">
//                         Create New User
//                     </Button>
//
//                     <Table striped bordered hover responsive>
//                         <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {users && users.length > 0 ? (
//                             users.map((user) => (
//                                 <tr key={user.id}>
//                                     <td>{user.id}</td>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>
//                                         <Link to={`/users/${user.id}`}>
//                                             <Button variant="info" className="me-2">
//                                                 View
//                                             </Button>
//                                         </Link>
//                                         <Link to={`/users/edit/${user.id}`}>
//                                             <Button variant="warning" className="me-2">
//                                                 Edit
//                                             </Button>
//                                         </Link>
//                                         {/* Button for deleting a user */}
//                                         <Button variant="danger">
//                                             Delete
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={4} className="text-center">
//                                     No users found.
//                                 </td>
//                             </tr>
//                         )}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default UsersPage;
