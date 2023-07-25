import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <section className="footer" id="footer">
            <Container>
                {/* <div className="go-top"><a href="#about"><i className="bi bi-arrow-up-circle-fill"></i></a></div> */}
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