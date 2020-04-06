import React, { useState } from 'react';
import moment from 'moment';
import { Col, Container, Row } from 'reactstrap';
import { Session } from 'bc-react-session';
import { HashLinkContainer } from 'components';

const session = Session.getSession();

const CaseCapture = props => {
    const [caseNumber] = useState('DF032AZ00022');

    return (
        <Container fluid className="pd-x-0 pd-lg-x-10 pd-xl-x-0">
            <ol className="breadcrumb df-breadcrumbs mg-b-10" style={{ padding: 0, backgroundColor: 'transparent' }}>
                <li className="breadcrumb-item">
                    <HashLinkContainer to="/cpanel/dashboard">
                        <a href="/cpanel/dashboard">Dashboard</a>
                    </HashLinkContainer>
                </li>
                <li className="breadcrumb-item">Cases</li>
                <li className="breadcrumb-item active" aria-current="page">Capture</li>
            </ol>
            <div className="d-sm-flex align-items-center justify-content-between">
                <div>
                    <h4 className="mg-b-10 mg-t-30">Case #{caseNumber}</h4>
                    <p className="mg-b-30 tx-color-03">Captured on {moment().format('MMMM DD, YYYY')}</p>
                </div>
                <div className="mg-t-20 mg-sm-t-0">
                    <button type="button" className="btn btn-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-printer mg-r-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg> Print</button>
                    {/* <button className="btn btn-white mg-l-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail mg-r-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Email</button> */}
                </div>
            </div>
            <div className="tx-13 mg-b-25">
                <form>
                    <div className="wizard clearfix">
                        <div className="content clearfix" style={{ borderTop: 'none' }}>
                            <Row>
                                <Col sm={6} lg={8}>
                                    <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">Captured By</label>
                                    <h6 className="tx-15 mg-b-0">
                                        {session.payload.user.first_name} {session.payload.user.last_name}
                                    </h6>
                                    <p className="mg-b-10">{session.payload.user.user_role.description}</p>

                                    <p className="mg-b-0">{session.payload.facility.name}</p>
                                    <p className="mg-b-0">Tel No: {session.payload.user.mobile}</p>
                                    <p className="mg-b-0">Email: {session.payload.user.email}</p>
                                </Col>
                                <Col sm={6} lg={4}>
                                    <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">Case Information</label>
                                    <ul className="list-unstyled lh-7">
                                        <li className="d-flex justify-content-between">
                                            <span>Case Number</span>
                                            <span>{caseNumber}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>Province</span>
                                            <span>{session.payload.facility.subdistrict.district.province.name}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>District Code</span>
                                            <span>{session.payload.facility.subdistrict.district.code}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>Capture on</span>
                                            <span>{moment().format('MMMM DD, YYYY')}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>Capture at</span>
                                            <span>{moment().format('hh:mm a')}</span>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                            <hr className="mg-y-30" />
                            <h3 tabIndex="-1" className="title current">Patient Information</h3>
                            <p>Please enter patient information below and save!</p>
                            <Row className="row-sm">
                                <Col xs={12} className="mg-y-20">
                                    <div className="d-flex">
                                        <div>
                                            <div className="custom-control custom-switch mg-b-20">
                                                <input type="checkbox" className="custom-control-input" id="medicalAid" />
                                                <label className="custom-control-label" htmlFor="medicalAid">Medical Aid</label>
                                            </div>
                                            <div className="custom-control custom-switch mg-b-20">
                                                <input type="checkbox" className="custom-control-input" id="respiratory" />
                                                <label className="custom-control-label" htmlFor="respiratory">Respiratory Problem</label>
                                            </div>
                                            <div className="custom-control custom-switch mg-b-10">
                                                <input type="checkbox" className="custom-control-input" id="chronic" />
                                                <label className="custom-control-label" htmlFor="chronic">Chronic Disease</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4} className="form-group mg-t-10 mg-sm-t-0">
                                    <label>Date of Test</label>
                                    <input type="text" className="form-control" placeholder="Date" />
                                </Col>
                                <Col sm={4} className="form-group mg-t-10 mg-sm-t-0">
                                    <label>Age</label>
                                    <input type="text" className="form-control" placeholder="Age" />
                                </Col>
                                <Col sm={4} className="form-group mg-t-10 mg-sm-t-0">
                                    <label>Gender</label>
                                    <select className="form-control">
                                        <option>Please select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </Col>
                            </Row>
                        </div>
                        <div className="actions clearfix">
                            <div className="text-right">
                                <div className="d-flex">
                                    <div>
                                        <button type="submit" className="btn btn-primary">
                                            &nbsp;
                                            Save Case
                                            &nbsp;
                                    </button>
                                    </div>
                                    <div className="mg-l-20">
                                        <div className="custom-control custom-switch mg-b-10 mg-t-10">
                                            <input type="checkbox" className="custom-control-input" id="addAnother" />
                                            <label className="custom-control-label" htmlFor="addAnother">Add Another</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default CaseCapture;
