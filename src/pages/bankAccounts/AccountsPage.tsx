import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  {RootState} from "../../app/store.ts";
import { getAllBankAccounts, deleteBankAccount } from '../../app/slices/bankAccountSlice';
import { Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
// import { format } from 'date-fns';
// import {formatDate} from "../../utils/formatDate.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const AccountsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const bankAccounts = useAppSelector((state: RootState) => state.bankAccount.bankAccounts);
    const status = useAppSelector((state: RootState) => state.bankAccount.status);
    const error = useAppSelector((state: RootState) => state.bankAccount.error);
    useEffect(() => {
        dispatch(getAllBankAccounts());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            dispatch(deleteBankAccount(id))
                .then(() => {
                    dispatch(getAllBankAccounts());
                })
                .catch((err) => {
                    console.error("Failed to delete bank account ", err.message);
                    alert('Error deleting bank account try again.');

                });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h3>Bank Accounts</h3>
                    {status === 'pending' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Loading bank accounts...</p>
                        </div>
                    )}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    {status === 'succeeded' && bankAccounts.length > 0 && (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Account Id</th>
                                <th>Account Type</th>
                                <th>Balance</th>
                                <th>Currency</th>
                                <th>Date Created</th>
                                <th>Date Updated</th>
                                <th>Customer</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bankAccounts.map((account) => (
                                <tr key={account.accountId}>
                                    <td>{account.accountId}</td>
                                    <td>{account.accountType}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.currency}</td>
                                    <td>{account.createDate}</td>
                                    <td>{account.updatedDate}</td>
                                    <td>
                                        <Link to={`/customers/${account.customerId}`}>
                                            {account.customer.firstName} {account.customer.lastName}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/accounts/${account.accountId}`} className="me-2">
                                            <i className="bi bi-eye text-primary"></i>
                                        </Link>
                                        <Link to={`/accounts/edit/${account.accountId}`} className="me-2">
                                            <i className="bi bi-pencil-square text-warning"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(account.accountId)}
                                            className="btn btn-link text-danger"
                                            aria-label={`Delete account ${account.accountId}`}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                    {status === 'succeeded' && bankAccounts.length === 0 && (
                        <Alert variant="info">No bank accounts found.</Alert>
                    )}
                    <Link to="/accounts/create" className="btn btn-primary mt-3">
                        Add New Account
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountsPage;
