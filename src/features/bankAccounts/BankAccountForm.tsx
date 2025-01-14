import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { useHistory, useParams } from 'react-router-dom';  // For routing
import { RootState } from '../app/store';
import { createBankAccount, updateBankAccount } from '../app/slices/bankAccountSlice';  // Assuming you have Redux actions
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';  // Importing Bootstrap components

interface BankAccountFormProps {
    initialData?: {
        accountNumber: string;
        holderName: string;
        type: string;
        balance: number;
        status: string;
    };
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ initialData }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();  // If editing an existing bank account

    const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
    const [holderName, setHolderName] = useState(initialData?.holderName || '');
    const [type, setType] = useState(initialData?.type || 'Checking');
    const [balance, setBalance] = useState(initialData?.balance || 0);
    const [status, setStatus] = useState(initialData?.status || 'Active');
    const [error, setError] = useState<string | null>(null);

    // Redux action result or status
    const bankAccountStatus = useSelector((state: RootState) => state.bankAccount.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!accountNumber || !holderName || !type || balance < 0) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const bankAccountData = { accountNumber, holderName, type, balance, status };

        if (id) {
            dispatch(updateBankAccount({ id, ...bankAccountData }));
        } else {
            dispatch(createBankAccount(bankAccountData));
        }

        setError(null);  // Clear any previous errors
        history.push('/bank-accounts');  // Redirect after successful submission
    };

    useEffect(() => {
        if (id) {
            // If editing, fetch the existing bank account data (e.g., by dispatching an action to fetch details)
            // Assume `fetchBankAccount` action is available in your slice
            // dispatch(fetchBankAccount(id));
        }
    }, [id, dispatch]);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h3>{id ? 'Edit Bank Account' : 'Create Bank Account'}</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAccountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formHolderName">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account holder name"
                                value={holderName}
                                onChange={(e) => setHolderName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>Checking</option>
                                <option>Savings</option>
                                <option>Business</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBalance">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter balance"
                                value={balance}
                                onChange={(e) => setBalance(Number(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            {id ? 'Update Account' : 'Create Account'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BankAccountForm;
