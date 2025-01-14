import React from 'react';
import { useParams } from 'react-router-dom';  // For routing
import { useSelector } from 'react-redux';  // For accessing Redux state
import { RootState } from '../app/store';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';  // Import Bootstrap components

// Assuming you have a selector to get bank account by ID
const BankAccountDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the account ID from the URL params
    const bankAccounts = useSelector((state: RootState) => state.bankAccount.accounts);  // Get bank accounts from Redux state

    // Find the bank account details by ID
    const bankAccount = bankAccounts.find((account) => account.id === id);

    if (!bankAccount) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2>Account Not Found</h2>
                        <p>The requested bank account could not be found.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h4>Bank Account Details</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p><strong>Account Number:</strong> {bankAccount.accountNumber}</p>
                                    <p><strong>Account Holder:</strong> {bankAccount.holderName}</p>
                                    <p><strong>Account Type:</strong> {bankAccount.type}</p>
                                    <p><strong>Balance:</strong> ${bankAccount.balance.toFixed(2)}</p>
                                    <p><strong>Status:</strong> {bankAccount.status}</p>
                                </Col>
                            </Row>
                            <Button variant="primary" href={`/bank-accounts/edit/${bankAccount.id}`}>
                                Edit Account
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BankAccountDetails;
