import { Col, Row, Modal, Button, Container } from "react-bootstrap";

function MyModal({ show, message, onClose }) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            keyboard={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h4>You should do {message} next!</h4>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} className="close-button">Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;