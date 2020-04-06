import React from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';

function CoModal(props) {
    const { show, setShow } = props;
	  
	const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="margin-bottom-15">
                    <Col xs={12}>
                        Body Content
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default CoModal;
