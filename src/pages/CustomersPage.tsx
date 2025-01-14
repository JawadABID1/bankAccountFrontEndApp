import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { getAllCustomers } from '../app/slices/customerSlice';  // Redux action for fetching customers
import { RootState } from '../app/store';  // RootState for accessing Redux state
import { Container, Row, Col, Table, Spinner, Alert, Button } from 'react-bootstrap';  // Bootstrap components
import { Link } from 'react-router-dom';  // For navigation links

const CustomersPage: React.FC = () => {
    const dispatch = useDispatch();

    // Redux state for customer data, loading, and error
    const { customers, status, error } = useSelector((state: RootState) => state.customer);

    // Fetch customers when the component mounts
    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>Customers</h3>

                    {/* Loading spinner */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading customers...</p>
                        </div>
                    )}

                    {/* Error alert */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Customers table */}
                    {status === 'succeeded' && customers.length > 0 && (
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <Link to={`/customers/${customer.id}`}>
                                            <Button variant="info" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}

                    {/* No customers found message */}
                    {status === 'succeeded' && customers.length === 0 && (
                        <p>No customers found.</p>
                    )}

                    {/* Link to create a new customer */}
                    <Link to="/create-customer">
                        <Button variant="primary" className="mt-3">
                            Create New Customer
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomersPage;
