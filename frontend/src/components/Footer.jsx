import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <section className="footer" id="footer">
            <Container>
                    <Row className="align-items-center">
                        <Col size={12}>
                            <p>&copy; Jason Zheng. All Rights Reserved</p>
                        </Col> 
                    </Row>
                </Container>
        </section>
    );
};

export default Footer;