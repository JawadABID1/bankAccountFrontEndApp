import React from 'react';
import { Link } from 'react-router-dom'; // For routing links
import { Container, Row, Col, Button, Card } from 'react-bootstrap'; // Bootstrap components

const NotFoundPage: React.FC = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Card className="p-4">
                        <Card.Body>
                            <Card.Title as="h1">404 - Page Not Found</Card.Title>
                            <Card.Text>
                                Sorry, the page you are looking for does not exist. Please check the URL or go back to the home page.
                            </Card.Text>
                            <Link to="/">
                                <Button variant="primary">Go to Home Page</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
