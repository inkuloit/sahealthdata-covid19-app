import React from 'react';
import NumberFormat from 'react-number-format';
import { Card, CardBody, Col, Row } from 'reactstrap';

const ResourceCountStats = props => {
    const { heading, value, summary, txColor } = props;

    return (
        <Card className="mg-b-10">
            <CardBody className="pd-y-20 pd-x-25">
                <Row className="row-sm">
                    <Col xs={7}>
                        <h3 className="tx-normal tx-rubik tx-spacing--1 mg-b-5">
                            <NumberFormat displayType={'text'} thousandSeparator value={value} />
                        </h3>
                        <h6 className={`tx-12 tx-semibold tx-uppercase tx-spacing-1 tx-${txColor} mg-b-5`}>{heading}</h6>
                        <p className="tx-11 tx-color-03 mg-b-0">{summary}</p>
                    </Col>
                    <Col xs={5}>
                        
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default ResourceCountStats;
