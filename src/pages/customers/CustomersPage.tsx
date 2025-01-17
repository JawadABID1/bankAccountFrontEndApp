import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { getAllCustomers, removeCustomer } from '../../app/slices/customerSlice.ts';
import { RootState } from "../../app/store.ts";
import { Container, Row, Col, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CustomersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { customers, status, error } = useAppSelector((state: RootState) => state.customer);

    // Fetch customers when the component mounts
    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]); // Only fetch customers once when the component mounts


    const deleteCustomer = (id: string) => {
        dispatch(removeCustomer(id))
            .then(() => {
                dispatch(getAllCustomers());
            })
            .catch((err) => {
                console.error('Failed to delete customer:', err.message);
                alert('Error deleting customer. Please try again.');
            });
    };

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
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <Link to={`/customers/${customer.id}`}>
                                            <i className="bi bi-eye text-primary"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/customers/edit/${customer.id}`}>
                                            <i className="bi bi-pencil-square text-warning"></i>
                                        </Link>
                                    </td>
                                    <td>
                                            <i onClick={()=>deleteCustomer(customer.id)} className="bi bi-trash text-danger"></i>
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
                    <Link to="/customers/create">
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
