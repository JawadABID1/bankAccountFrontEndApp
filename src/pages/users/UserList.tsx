import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { Link } from 'react-router-dom';  // For routing links
// import { RootState } from '../app/store';  // RootState for accessing Redux state
import {RootState} from "../../app/store.ts";
import { fetchUsers, deleteUser } from '../app/slices/userSlice';  // Redux actions for fetching and deleting users
// import {fetchUserProfile} from "../../app/slices/authSlice.ts";
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const UserList: React.FC = () => {
    const dispatch = useDispatch();

    // Redux state for users, loading status, and error messages
    const users = useSelector((state: RootState) => state.user.users);
    const status = useSelector((state: RootState) => state.user.status);
    const error = useSelector((state: RootState) => state.user.error);

    // Fetch users when the component mounts
    useEffect(() => {
        dispatch(fetchUsers());  // Fetch all users from the API
    }, [dispatch]);

    // Handle user deletion
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));  // Dispatch delete action
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>User List</h3>

                    {/* Loading state */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading users...</p>
                        </div>
                    )}

                    {/* Error state */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* User Table */}
                    {status === 'succeeded' && users && users.length > 0 ? (
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link to={`/users/edit/${user.id}`}>
                                            <Button variant="warning" size="sm" className="me-2">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No users found.</p>
                    )}

                    {/* Back to Dashboard */}
                    <Link to="/dashboard">
                        <Button variant="secondary" className="mt-3">
                            Back to Dashboard
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default UserList;
