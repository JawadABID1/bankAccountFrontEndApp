import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { useParams, useHistory } from 'react-router-dom';  // For routing and params
import { RootState } from '../app/store';
import { createCustomer, fetchCustomerDetails, updateCustomer } from '../app/slices/customerSlice';  // Assuming these actions exist
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const CustomerForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the customer ID from the URL params (for editing)
    const dispatch = useDispatch();
    const history = useHistory();

    // States to manage form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('Active');
    const [errorMessage, setErrorMessage] = useState('');

    // Redux state for loading and error
    const customer = useSelector((state: RootState) => state.customer.customer);
    const customerStatus = useSelector((state: RootState) => state.customer.status);
    const customerError = useSelector((state: RootState) => state.customer.error);

    // Fetch customer details if editing
    useEffect(() => {
        if (id) {
            dispatch(fetchCustomerDetails(id));  // Fetch the customer details by ID for editing
        }
    }, [dispatch, id]);

    // Set form data if customer is fetched (for editing)
    useEffect(() => {
        if (id && customer) {
            setName(customer.name);
            setEmail(customer.email);
            setPhone(customer.phone);
            setAddress(customer.address);
            setStatus(customer.status);
        }
    }, [id, customer]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        if (!name || !email || !phone || !address) {
            setErrorMessage('All fields are required');
            return;
        }

        const customerData = { name, email, phone, address, status };

        // Dispatch action based on whether we're creating or updating
        if (id) {
            dispatch(updateCustomer({ id, ...customerData }))
                .then(() => {
                    history.push(`/customers/${id}`);  // Redirect to the customer's details page after update
                })
                .catch(() => setErrorMessage('Failed to update customer'));
        } else {
            dispatch(createCustomer(customerData))
                .then(() => {
                    history.push('/customers');  // Redirect to the customer list after creation
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
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Control>
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="secondary" onClick={() => history.push('/customers')}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className="ml-2">
                                {id ? 'Update Customer' : 'Create Customer'}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerForm;
