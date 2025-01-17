import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import {useParams, useNavigate, Link} from 'react-router-dom';  // For routing and params
import {RootState} from "../../types/redux";
// import { createCustomer, fetchCustomerDetails, updateCustomer } from '../app/slices/customerSlice';  // Assuming these actions exist
import {addCustomer, modifyCustomer, getCustomerById} from "../../app/slices/customerSlice.ts";
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import {CustomerUpdateRequest} from "../../types/customer";  // Bootstrap components

const CustomerForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the customer ID from the URL params (for editing)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States to manage form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Redux state for loading and error
    const customer = useSelector((state: RootState) => state.customer.selectedCustomer);
    const customerStatus = useSelector((state: RootState) => state.customer.status);
    const customerError = useSelector((state: RootState) => state.customer.error);

    // Fetch customer details if editing
    useEffect(() => {
        if (id) {
            dispatch(getCustomerById(id));  // Fetch the customer details by ID for editing
        }
    }, [dispatch, id]);

    // Set form data if customer is fetched (for editing)
    useEffect(() => {
        if (id && customer) {
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setEmail(customer.email);
        }
    }, [id, customer]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        if (!firstName || !lastName || !email) {
            setErrorMessage('All fields are required');
            return;
        }

        const customerData: CustomerUpdateRequest = { firstName, lastName, email};
        console.log("customerData: " + JSON.stringify(customerData));
        // Dispatch action based on whether we're creating or updating
        if (id) {
            dispatch(modifyCustomer({ id, data: customerData }))
                .then(() => {
                    navigate(`/customers/${id}`);  // Redirect to the customer's details page after update
                })
                .catch(() => setErrorMessage('Failed to update customer'));
        } else {
            dispatch(addCustomer(customerData))
                .then(() => {
                    navigate('/customers');  // Redirect to the customer list after creation
                })
                .catch(() => setErrorMessage('Failed to create customer'));
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <h3>{id ? 'Edit Customer' : 'Create Customer'}</h3>

                    {customerStatus === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading customer details...</p>
                        </div>
                    )}

                    {customerStatus === 'failed' && <Alert variant="danger">{customerError}</Alert>}

                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-3">
                            {id &&(<Button variant="secondary" onClick={() => navigate(`/customers/${id}`)}>
                                Cancel
                            </Button>)}
                            <Button variant="primary" type="submit" className="ml-2">
                                {id ? 'Update Customer' : 'Create Customer'}
                            </Button>
                        </div>
                    </Form>
                    <Link to={'/customers'}>
                        <Button className="ml-auto" variant="primary">Back to List </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerForm;
