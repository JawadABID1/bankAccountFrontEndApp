import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { Link } from 'react-router-dom';  // For routing links
import { RootState } from '../app/store';  // RootState for accessing Redux state
// import { fetchCustomers, deleteCustomer } from '../app/api/customerSlice';  // Redux actions
import  {fetchCustomers, deleteCustomer} from "../../api/customerAPI.ts";
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const CustomerList: React.FC = () => {
    const dispatch = useDispatch();

    // Redux state for customers, loading status, and error message
    const customers = useSelector((state: RootState) => state.customer.customers);
    const status = useSelector((state: RootState) => state.customer.status);
    const error = useSelector((state: RootState) => state.customer.error);

    // Fetch customers on component mount
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    // Handle deleting a customer
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch(deleteCustomer(id));
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>Customer List</h3>

                    {/* Show loading spinner when fetching customers */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading customers...</p>
                        </div>
                    )}

                    {/* Show error message if failed to load customers */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Show customers list in a table */}
                    {status === 'succeeded' && (
                        <>
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.status}</td>
                                        <td>
                                            <Link to={`/customers/${customer.id}`} className="btn btn-info btn-sm mr-2">
                                                View
                                            </Link>
                                            <Link to={`/customers/edit/${customer.id}`} className="btn btn-warning btn-sm mr-2">
                                                Edit
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(customer.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Link to="/customers/create" className="btn btn-primary">
                                Add New Customer
                            </Link>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerList;
