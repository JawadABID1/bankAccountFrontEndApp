import React from 'react';
import { Link } from 'react-router-dom'; // For routing links
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Bootstrap components

const HomePage: React.FC = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={12} className="text-center bg-light p-5 rounded">
                    <h1>Welcome to Your Dashboard</h1>
                    <p>
                        Get started by exploring the key features of the application.
                    </p>
                    <Link to="/dashboard">
                        <Button variant="primary" size="lg">
                            Go to Dashboard
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                Manage and view details of all registered users in your system.
                            </Card.Text>
                            <Link to="/users">
                                <Button variant="outline-primary">Manage Users</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Bank Accounts</Card.Title>
                            <Card.Text>
                                View and manage all bank accounts associated with your organization.
                            </Card.Text>
                            <Link to="/bank-accounts">
                                <Button variant="outline-primary">Manage Bank Accounts</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Customers</Card.Title>
                            <Card.Text>
                                View and manage customer profiles, including their details and interactions.
                            </Card.Text>
                            <Link to="/customers">
                                <Button variant="outline-primary">Manage Customers</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
