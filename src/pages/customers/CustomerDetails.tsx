import React, { useEffect } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';  // For routing and params
import  {RootState} from "../../app/store.ts";
import {getCustomerById, removeCustomer} from "../../app/slices/customerSlice.ts";
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";  // Bootstrap components

const CustomerDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();  // Get the customer ID from the URL params
    const dispatch = useAppDispatch()
    const customer = useAppSelector((state: RootState) => state.customer.selectedCustomer);
    console.log("customer: ", customer);
    const status = useAppSelector((state: RootState) => state.customer.status);
    const error = useAppSelector((state: RootState) => state.customer.error);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getCustomerById(id));  // Fetch the customer details by ID
        }
    }, [dispatch, id]);

    const deleteCustomer = () => {
        if (window.confirm("Are you sur to delete this customer?")) {
            if (id) {
                dispatch(removeCustomer(id))
                    .then(() => {
                        navigate('/customers'); // Redirect to the customers list on success
                    })
                    .catch((err) => {
                        console.error('Failed to delete customer:', err.message);
                        alert('Error deleting customer. Please try again.');
                    });
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <h3>Customer Details</h3>
                    {status === 'pending' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading customer details...</p>
                        </div>
                    )}
                    {status === 'failed' && <p className="text-danger">Error: {error}</p>}
                    {status === 'succeeded' && customer && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{customer.firstName + " " + customer.lastName}</Card.Title>
                                <Card.Text>
                                    <strong>First name:</strong> {customer.firstName}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Last name:</strong> {customer.lastName}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Email:</strong> {customer.email}
                                </Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Link className='m-2' to={`/customers/edit/${customer.id}`}>
                                        <Button variant="warning" size="sm" className="mr-2">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </Link>
                                    {/*<Link className='m-2' to={`/customers/edit/${customer.id}`}>*/}
                                    <Button onClick={deleteCustomer} className='m-2' variant="danger" size="sm">
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                    {/*</Link>*/}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    {status === 'succeeded' && !customer && <p>Customer not found.</p>}

                    <Link to={'/customers'}>
                        <Button className="ml-auto" variant="primary">Back to List </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerDetails;
