import React from 'react';
import { Container, Row } from 'react-bootstrap';

const AboutPage = () => {
    return (
        <Container>
            <Row>
                <h1>About Our Green Market</h1>
            </Row>
            <Row>
                <p>Welcome to our Green Market platform where farmers can sell their fresh farm products directly to customers! We believe in promoting locally grown produce and supporting sustainable agriculture practices.</p>
            </Row>
            <Row>
                <p>Our platform provides a convenient and easy way for farmers to showcase their products and for customers to browse and purchase fresh, organic goods.</p>
            </Row>
            <Row>
                <h2>Our Mission</h2>
            </Row>
            <Row>
                <p>Our mission is to connect farmers and customers in a transparent and fair marketplace. We aim to promote healthy living by offering high-quality, farm-fresh products straight from the source.</p>
            </Row>
            <Row>
                <h2>Get Involved</h2>
            </Row>
            <Row>
                <p>If you are a farmer looking to sell your products or a customer interested in buying fresh farm goods, we invite you to join our community! Explore our marketplace and support local farmers today.</p>
            </Row>
        </Container>
    );
}

export default AboutPage;
