import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';  // For routing
import { useSelector } from 'react-redux';  // For accessing Redux state
import  {RootState} from "../../app/store.ts";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteBankAccount} from "../../app/slices/bankAccountSlice.ts";  // Import Bootstrap components

// Assuming you have a selector to get bank account by ID
const BankAccountDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the account ID from the URL params
    const bankAccounts = useSelector((state: RootState) => state.bankAccount.bankAccounts);  // Get bank accounts from Redux state
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // Find the bank account details by ID
    const bankAccount = bankAccounts.find((account) => account.accountId === id);

    const deleteAccount = ()=>{
        if (window.confirm("Are you sure to delete this BankAccount?")) {
            dispatch(deleteBankAccount(id))
                .then(()=>{
                    navigate("/accounts")
                })
                .catch((err)=>{
                    console.error("Failed to delete BankAccount", err.message);
                    alert("Error deleting bankAccount, please try again");

                });
        }
    }

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
                                    <p><strong>Account Type:</strong> {bankAccount.accountType}</p>
                                    <p><strong>Account Currency:</strong> {bankAccount.currency}</p>
                                    <p><strong>Balance:</strong> ${bankAccount.balance.toFixed(2)}</p>
                                    <p><strong>Created Date:</strong> {bankAccount.createDate}</p>
                                    <p><strong>Updated Date:</strong> {bankAccount.updatedDate}</p>
                                    <p><strong>Customer:</strong> {bankAccount.customerId}</p>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Link className='m-2' to={`/accounts/edit/${bankAccount.accountId}`}>
                                    <Button variant="warning" size="sm" className="mr-2">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </Link>
                                {/*<Link className='m-2' to={`/customers/edit/${customer.id}`}>*/}
                                <Button onClick={deleteAccount} className='m-2' variant="danger" size="sm">
                                    <i className="bi bi-trash"></i>
                                </Button>
                                {/*</Link>*/}
                            </div>
                        </Card.Body>
                    </Card>
                    <Link to={'/accounts'}>
                        <Button className="ml-auto" variant="primary">Back to List </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default BankAccountDetails;
