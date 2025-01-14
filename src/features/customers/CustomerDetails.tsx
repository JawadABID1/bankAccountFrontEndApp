import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { useParams, Link } from 'react-router-dom';  // For routing and params
import { RootState } from '../app/store';
import {getCustomerById} from "../../app/slices/customerSlice.ts";
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';  // Bootstrap components

const CustomerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the customer ID from the URL params
    const dispatch = useDispatch();
    const customer = useSelector((state: RootState) => state.customer.customer);
    const status = useSelector((state: RootState) => state.customer.status);
    const error = useSelector((state: RootState) => state.customer.error);

    useEffect(() => {
        if (id) {
            dispatch(getCustomerById(id));  // Fetch the customer details by ID
        }
    }, [dispatch, id]);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <h3>Customer Details</h3>
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading customer details...</p>
                        </div>
                    )}
                    {status === 'failed' && <p className="text-danger">Error: {error}</p>}
                    {status === 'succeeded' && customer && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{customer.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {customer.email}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Phone:</strong> {customer.phone}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Address:</strong> {customer.address}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {customer.status}
                                </Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Link to={`/customers/edit/${customer.id}`}>
                                        <Button variant="warning" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="danger" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    {status === 'succeeded' && !customer && <p>Customer not found.</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerDetails;
