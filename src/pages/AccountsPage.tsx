import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { Link } from 'react-router-dom';  // For routing links
import { RootState } from '../app/store';  // RootState for accessing Redux state
import { getAllBankAccounts, deleteBankAccount } from '../app/slices/bankAccountSlice';  // Redux actions for fetching and deleting accounts
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const AccountsPage: React.FC = () => {
    const dispatch = useDispatch();

    // Redux state for bank accounts, loading status, and error messages
    const bankAccounts = useSelector((state: RootState) => state.bankAccount.accounts);
    const status = useSelector((state: RootState) => state.bankAccount.status);
    const error = useSelector((state: RootState) => state.bankAccount.error);

    // Fetch bank accounts when the component mounts
    useEffect(() => {
        dispatch(getAllBankAccounts());
    }, [dispatch]);

    // Handle bank account deletion
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            dispatch(deleteBankAccount(id));
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>Bank Accounts</h3>

                    {/* Loading state */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading bank accounts...</p>
                        </div>
                    )}

                    {/* Error state */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Bank accounts table */}
                    {status === 'succeeded' && (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Holder</th>
                                <th>Balance</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bankAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.accountHolder}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.status}</td>
                                    <td>
                                        <Link to={`/bank-accounts/${account.id}`} className="btn btn-info btn-sm me-2">
                                            View
                                        </Link>
                                        <Link to={`/bank-accounts/edit/${account.id}`} className="btn btn-warning btn-sm me-2">
                                            Edit
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(account.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}

                    {/* No bank accounts found message */}
                    {status === 'succeeded' && bankAccounts.length === 0 && (
                        <Alert variant="info">No bank accounts found.</Alert>
                    )}

                    {/* Add new bank account button */}
                    <Link to="/bank-accounts/create" className="btn btn-primary mt-3">
                        Add New Account
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountsPage;
