import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {Link, useNavigate, useParams} from 'react-router-dom';
import  {RootState} from "../../app/store.ts";
import {
    createNewBankAccount,
    getBankAccountById,
    updateExistingBankAccount
} from "../../app/slices/bankAccountSlice.ts";
import { getAllCustomers } from "../../app/slices/customerSlice.ts";  // Assuming this action exists
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

interface BankAccountFormProps {
    initialData?: {
        accountId: string;
        currency: string;
        accountType: string;
        balance: number;
        customerId: number;
    };
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ initialData }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [accountId, setAccountId] = useState(initialData?.accountId || '');
    const [balance, setAccountBalance] = useState(initialData?.balance || 0);
    const [currency, setAccountCurrency] = useState(initialData?.currency || '');
    const [accountType, setAccountType] = useState(initialData?.accountType || '');
    const [customerId, setCustomerId] = useState(initialData?.customerId || 0);
    const [error, setError] = useState<string | null>(null);

    // Fetch customers
    const customers = useAppSelector((state: RootState) => state.customer.customers);
    const bankAccountStatus = useAppSelector((state: RootState) => state.bankAccount.status);
    const bankAccount = useAppSelector((state: RootState) => state.bankAccount.selectedAccount);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('id: ', accountId, balance, 'currency: ', currency, 'type: ', accountType, 'customerId: ', customerId);

        if (!accountId || !currency || !accountType || !balance ||!customerId) {
            setError('Please fill in all fields correctly.');
            return;
        }


        if (id) {
            const bankAccountData = { balance, currency, accountType, customerId };
            dispatch(updateExistingBankAccount({ id, data: bankAccountData }));
            console.log('bankAccountData: ', JSON.stringify(bankAccountData));
        } else {
            const bankAccountData = { accountId, balance, currency, accountType, customerId };
            dispatch(createNewBankAccount(bankAccountData));
        }

        setError(null);
        navigate('/accounts');
    };

    useEffect(() => {
        if(id){
            dispatch(getBankAccountById(id));
        }
        dispatch(getAllCustomers());  // Fetch customers on form load
    }, [dispatch, id]);

    useEffect(() => {
        if (id && bankAccount) {
            setAccountId(bankAccount.accountId);
            setAccountBalance(bankAccount.balance);
            setAccountCurrency(bankAccount.currency);
            setAccountType(bankAccount.accountType);
            setCustomerId(bankAccount.customerId);
        }
    }, [id, bankAccount]);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h3>{id ? 'Edit Bank Account' : 'Create Bank Account'}</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAccountId">
                            <Form.Label>Account Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account id"
                                value={accountId}
                                onChange={(e) => setAccountId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAccountBalance">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter account Balance"
                                value={balance}
                                onChange={(e) => setAccountBalance(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAccountCurrency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                placeholder="Enter currency"
                                value={currency}
                                onChange={(e) => setAccountCurrency(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAccountType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                            >
                                <option value="">Select Account Type</option>
                                <option value="CURRENT_ACCOUNT">Current Account</option>
                                <option value="SAVINGS_ACCOUNT">Savings Account</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCustomerId">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control
                                as="select"
                                type="number"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            >
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.firstName+' ' + customer.lastName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 m-3">
                            {id ? 'Update Account' : 'Create Account'}
                        </Button>
                        <Link to="/accounts" className="btn btn-primary mt-3 m-3">
                            Back to list
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BankAccountForm;
