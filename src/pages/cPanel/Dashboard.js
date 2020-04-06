import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Session } from 'bc-react-session';
import { HashLinkContainer } from 'components';
const session = Session.getSession();

const Dashboard = () => {
    return (
        <Container fluid className="pd-x-0 pd-lg-x-10 pd-xl-x-0">
            <Row className="row-xs">
				<Col lg={12} className="mg-b-10">
					<Card className="mg-b-10">
						<CardBody>
							<div className="media">
								<div className="media-body">
									<h4 className="mg-b-10">Welcome back, {session.payload.user.first_name}</h4>
									<p className="tx-color-03 mg-b-0">
										In locations without social distancing measures currently in place, we have assumed they will be in place within seven days of the last model update. If not, the number of deaths and burden on their hospital systems will likely be higher than the model predicts.
										For answers to other frequently asked questions about the modeling.
										To view the paper with in-depth analysis and a description of the methods used to produce the projections.
									</p>
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
            </Row>
            <Row className="row-xs mg-t-10 mg-b-10">
                <Col xs={12} sm={3}>
                    <HashLinkContainer to="/cpanel/cases/capture">
                        <button className="btn btn-primary btn-lg btn-block btn-uppercase pd-y-30 display-2">
                            <span style={{ fontSize: '1.2em', fontWeight: 300 }}>Single Case Capture</span>
                        </button>
                    </HashLinkContainer>
                </Col>
                <Col xs={12} sm={3}>
                    <HashLinkContainer to="/cpanel/cases/bulk-capture">
                        <button className="btn btn-secondary btn-lg btn-block btn-uppercase pd-y-30 display-2">
                            <span style={{ fontSize: '1.2em', fontWeight: 300 }}>Bulk Case Import</span>
                        </button>
                    </HashLinkContainer>
                </Col>
                <Col xs={12} sm={3}>
                    <HashLinkContainer to="/cpanel/resources/capture">
                        <button className="btn btn-primary btn-lg btn-block btn-uppercase pd-y-30 display-2">
                            <span style={{ fontSize: '1.2em', fontWeight: 300 }}>Single Resource Record</span>
                        </button>
                    </HashLinkContainer>
                </Col>
                <Col xs={12} sm={3}>
                    <HashLinkContainer to="/cpanel/resources/bulk-capture">
                        <button className="btn btn-secondary btn-lg btn-block btn-uppercase pd-y-30 display-2">
                            <span style={{ fontSize: '1.2em', fontWeight: 300 }}>Bulk Resource Import</span>
                        </button>
                    </HashLinkContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
