// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
// import { useHistory } from 'react-router-dom';  // For navigation after customer creation
// import { createCustomer } from '../app/slices/customerSlice';  // Redux action for creating a customer
// import { RootState } from '../app/store';  // RootState for accessing Redux state
// import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components
//
// const CreateCustomerPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//
//     // Redux state for loading and error handling
//     const status = useSelector((state: RootState) => state.customer.status);
//     const error = useSelector((state: RootState) => state.customer.error);
//
//     // Local state for form fields
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address, setAddress] = useState('');
//
//     // Handle form submission
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//
//         // Dispatch the action to create a new customer
//         const newCustomer = {
//             name,
//             email,
//             phone,
//             address,
//         };
//
//         dispatch(createCustomer(newCustomer)).then((action) => {
//             // Navigate to the customer list page after successful creation
//             if (action.type === 'customer/createCustomer/fulfilled') {
//                 history.push('/customers');
//             }
//         });
//     };
//
//     return (
//         <Container>
//             <Row className="justify-content-center mt-5">
//                 <Col md={6}>
//                     <h3>Create Customer</h3>
//
//                     {/* Loading spinner */}
//                     {status === 'loading' && (
//                         <div className="text-center">
//                             <Spinner animation="border" />
//                             <p>Creating customer...</p>
//                         </div>
//                     )}
//
//                     {/* Error alert */}
//                     {status === 'failed' && <Alert variant="danger">{error}</Alert>}
//
//                     {/* Customer creation form */}
//                     {status !== 'loading' && (
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group controlId="name" className="mb-3">
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter customer name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="email" className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Enter customer email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="phone" className="mb-3">
//                                 <Form.Label>Phone</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter customer phone number"
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Form.Group controlId="address" className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter customer address"
//                                     value={address}
//                                     onChange={(e) => setAddress(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//
//                             <Button variant="primary" type="submit" className="w-100">
//                                 Create Customer
//                             </Button>
//                         </Form>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default CreateCustomerPage;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // For Redux actions and state
import { useNavigate } from 'react-router-dom';  // For navigation after customer creation (updated)
import { addCustomer } from '../app/slices/customerSlice';  // Redux action for creating a customer
import { RootState } from '../app/store';  // RootState for accessing Redux state
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';  // Bootstrap components

const CreateCustomerPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Updated to use navigate

    // Redux state for loading and error handling
    const status = useSelector((state: RootState) => state.customer.status);
    const error = useSelector((state: RootState) => state.customer.error);

    // Local state for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Dispatch the action to create a new customer
        const newCustomer = {
            name,
            email,
            phone,
            address,
        };

        dispatch(addCustomer(newCustomer)).then((action) => {
            // Navigate to the customer list page after successful creation
            if (action.type === 'customer/createCustomer/fulfilled') {
                navigate('/customers');  // Updated to use navigate
            }
        });
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h3>Create Customer</h3>

                    {/* Loading spinner */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Creating customer...</p>
                        </div>
                    )}

                    {/* Error alert */}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Customer creation form */}
                    {status !== 'loading' && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter customer email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="phone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="address" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Create Customer
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateCustomerPage;
