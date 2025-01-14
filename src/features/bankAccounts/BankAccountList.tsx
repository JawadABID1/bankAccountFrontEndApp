import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { RootState } from '../app/store';
import {RootState} from "../../app/store.ts";
// import { fetchBankAccounts } from '../app/slices/bankAccountSlice';  // Assuming you have this action
import {fetchBankAccounts} from "../../api/bankAccountApi.ts";
import { Link } from 'react-router-dom';  // For routing links
import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap';  // Bootstrap components

const BankAccountList: React.FC = () => {
    const dispatch = useDispatch();
    const bankAccounts = useSelector((state: RootState) => state.bankAccount.accounts);
    const status = useSelector((state: RootState) => state.bankAccount.status);
    const error = useSelector((state: RootState) => state.bankAccount.error);

    useEffect(() => {
        dispatch(fetchBankAccounts());  // Dispatch action to fetch bank accounts when the component mounts
    }, [dispatch]);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>Bank Accounts</h3>
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading bank accounts...</p>
                        </div>
                    )}
                    {status === 'failed' && <p className="text-danger">Error: {error}</p>}
                    {status === 'succeeded' && bankAccounts.length === 0 && (
                        <p>No bank accounts found. Please add a new account.</p>
                    )}
                    {status === 'succeeded' && bankAccounts.length > 0 && (
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Holder Name</th>
                                <th>Account Type</th>
                                <th>Balance</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bankAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.holderName}</td>
                                    <td>{account.type}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.status}</td>
                                    <td>
                                        <Link to={`/bank-accounts/edit/${account.id}`}>
                                            <Button variant="warning" size="sm" className="mr-2">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button variant="danger" size="sm">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                    <Link to="/bank-accounts/create">
                        <Button variant="primary" className="mt-3">
                            Create New Account
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default BankAccountList;
