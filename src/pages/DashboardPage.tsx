import React, { useEffect } from 'react';
import { getAllBankAccounts } from '../app/slices/bankAccountSlice';  // Redux action for fetching bank accounts
import { getAllCustomers } from '../app/slices/customerSlice';  // Redux action for fetching customers
import { RootState } from '../app/store';  // RootState for accessing Redux state
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";  // Bootstrap components

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();

    // Redux state for users, bank accounts, and customers
    // const { users, status: usersStatus, error: usersError } = useSelector((state: RootState) => state.user);
    const { bankAccounts, status: bankAccountsStatus, error: bankAccountsError } = useAppSelector((state: RootState) => state.bankAccount);
    const { customers, status: customersStatus, error: customersError } = useAppSelector((state: RootState) => state.customer);

    // Fetch data when the component mounts
    useEffect(() => {
        // dispatch(getAllUsers());
        dispatch(getAllBankAccounts());
        dispatch(getAllCustomers());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <Row>
                {/*<Col md={4}>*/}
                {/*    <Card>*/}
                {/*        <Card.Body>*/}
                {/*            <Card.Title>Users</Card.Title>*/}
                {/*            {usersStatus === 'loading' && (*/}
                {/*                <div className="text-center">*/}
                {/*                    <Spinner animation="border" />*/}
                {/*                    <p>Loading users...</p>*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*            {usersStatus === 'failed' && <Alert variant="danger">{usersError}</Alert>}*/}
                {/*            {usersStatus === 'succeeded' && (*/}
                {/*                <>*/}
                {/*                    <h4>{users.length}</h4>*/}
                {/*                    <p>Total Users</p>*/}
                {/*                    <Button variant="primary" href="/users">Manage Users</Button>*/}
                {/*                </>*/}
                {/*            )}*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*</Col>*/}

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Bank Accounts</Card.Title>
                            {bankAccountsStatus === 'pending' && (
                                <div className="text-center">
                                    <Spinner animation="border" />
                                    <p>Loading bank accounts...</p>
                                </div>
                            )}
                            {bankAccountsStatus === 'failed' && <Alert variant="danger">{bankAccountsError}</Alert>}
                            {bankAccountsStatus === 'succeeded' && (
                                <>
                                    <h4>{bankAccounts.length}</h4>
                                    <p>Total Bank Accounts</p>
                                    <Button variant="primary" href="/accounts">Manage Accounts</Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Customers</Card.Title>
                            {customersStatus === 'pending' && (
                                <div className="text-center">
                                    <Spinner animation="border" />
                                    <p>Loading customers...</p>
                                </div>
                            )}
                            {customersStatus === 'failed' && <Alert variant="danger">{customersError}</Alert>}
                            {customersStatus === 'succeeded' && (
                                <>
                                    <h4>{customers.length}</h4>
                                    <p>Total Customers</p>
                                    <Button variant="primary" href="/customers">Manage Customers</Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;
