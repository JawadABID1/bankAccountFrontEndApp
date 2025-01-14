// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { useHistory } from 'react-router-dom';  // For navigation after account creation
// import { createBankAccount } from '../app/slices/bankAccountSlice';  // Redux action for creating bank account
// import { RootState } from '../app/store';  // RootState for accessing Redux state
// import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components
//
// const CreateAccountPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//
//     // Redux state for loading and error handling
//     const status = useSelector((state: RootState) => state.bankAccount.status);
//     const error = useSelector((state: RootState) => state.bankAccount.error);
//
//     // Local state for form fields
//     const [accountNumber, setAccountNumber] = useState('');
//     const [accountHolder, setAccountHolder] = useState('');
//     const [bankName, setBankName] = useState('');
//     const [balance, setBalance] = useState('');
//     const [statusField, setStatusField] = useState('active');  // Default status is "active"
//
//     // Handle form submission
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//
//         // Dispatch the action to create a new bank account
//         const newAccount = {
//             accountNumber,
//             accountHolder,
//             bankName,
//             balance: parseFloat(balance),
//             status: statusField,
//         };
//
//         dispatch(createBankAccount(newAccount)).then((action) => {
//             // Navigate to the accounts list page after successful creation
//             if (action.type === 'bankAccounts/createBankAccount/fulfilled') {
//                 history.push('/bank-accounts');
//             }
//         });
//     };
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={6}>
//                     <h3>Create Bank Account</h3>
//
//                     {/* Loading spinner */}
//                     {status === 'loading' && (
//                         <div className="text-center">
//                             <Spinner animation="border" />
//                             <p>Creating account...</p>
//                         </div>
//                     )}
//
//                     {/* Error alert */}
//                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
//
//                     {/* Account creation form */}
//                     {status !== 'loading' && (
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group controlId="accountNumber" className="mb-3">
//                                 <Form.Label>Account Number</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter account number"
//                                     value={accountNumber}
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="accountHolder" className="mb-3">
//                                 <Form.Label>Account Holder</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter account holder name"
//                                     value={accountHolder}
//                                     onChange={(e) => setAccountHolder(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="bankName" className="mb-3">
//                                 <Form.Label>Bank Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter bank name"
//                                     value={bankName}
//                                     onChange={(e) => setBankName(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="balance" className="mb-3">
//                                 <Form.Label>Balance</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Enter account balance"
//                                     value={balance}
//                                     onChange={(e) => setBalance(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="status" className="mb-3">
//                                 <Form.Label>Status</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     value={statusField}
//                                     onChange={(e) => setStatusField(e.target.value)}
//                                 >
//                                     <option value="active">Active</option>
//                                     <option value="inactive">Inactive</option>
//                                 </Form.Control>
//                             </Form.Group>
//
//                             <Button variant="primary" type="submit" className="w-100">
//                                 Create Account
//                             </Button>
//                         </Form>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default CreateAccountPage;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { useNavigate } from 'react-router-dom';  // For navigation after account creation (updated)
import { createNewBankAccount } from '../app/slices/bankAccountSlice';  // Redux action for creating bank account
import { RootState } from '../app/store';  // RootState for accessing Redux state
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const CreateAccountPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Updated to use navigate

    // Redux state for loading and error handling
    const status = useSelector((state: RootState) => state.bankAccount.status);
    const error = useSelector((state: RootState) => state.bankAccount.error);

    // Local state for form fields
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [bankName, setBankName] = useState('');
    const [balance, setBalance] = useState('');
    const [statusField, setStatusField] = useState('active');  // Default status is "active"

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Dispatch the action to create a new bank account
        const newAccount = {
            accountNumber,
            accountHolder,
            bankName,
            balance: parseFloat(balance),
            status: statusField,
        };

        dispatch(createNewBankAccount(newAccount)).then((action) => {
            // Navigate to the accounts list page after successful creation
            if (action.type === 'bankAccounts/createBankAccount/fulfilled') {
                navigate('/bank-accounts');  // Updated to use navigate
            }
        });
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h3>Create Bank Account</h3>

                    {/* Loading spinner */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Creating account...</p>
                        </div>
                    )}

                    {/* Error alert */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Account creation form */}
                    {status !== 'loading' && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="accountNumber" className="mb-3">
                                <Form.Label>Account Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter account number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="accountHolder" className="mb-3">
                                <Form.Label>Account Holder</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter account holder name"
                                    value={accountHolder}
                                    onChange={(e) => setAccountHolder(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="bankName" className="mb-3">
                                <Form.Label>Bank Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter bank name"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="balance" className="mb-3">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter account balance"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="status" className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={statusField}
                                    onChange={(e) => setStatusField(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Create Account
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateAccountPage;
