import React, { useEffect } from 'react';
import {
	Card,
	CardBody,
	Container,
	Col,
	Row,
} from 'reactstrap';
import {
	ResourceUseStats,
	ResourceCountStats,
} from 'components';

function Home() {

	document.title = 'Coronavirus Projections - South Africa';

	useEffect(() => {
		const fetchData = async () => {
			
		};
		fetchData();
	}, []);

	return (
		<Container fluid className="pd-x-0 pd-lg-x-10 pd-xl-x-0">
			<div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-30">
				<div>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb breadcrumb-style1 mg-b-10">
							<li className="breadcrumb-item">
								<a href="/">Statistics</a>
							</li>
							<li className="breadcrumb-item active" aria-current="page">South Africa</li>
						</ol>
					</nav>
					<h4 className="mg-b-0 tx-spacing--1">COVID-19 Projections</h4>
				</div>
				<div className="d-none d-md-block">
					<div data-label="Example" className="df-example demo-forms">
						<div>
							<select className="form-control select2">
								<option label="All Provinces (South Africa)">All Provinces</option>
								<option value="Eastern Cape">Eastern Cape</option>
								<option value="Free State">Free State</option>
								<option value="Gauteng">Gauteng</option>
								<option value="KwaZulu Natal">KwaZulu Natal</option>
								<option value="Limpopo">Limpopo</option>
								<option value="Mpumalanga">Mpumalanga</option>
								<option value="Northern Cape">Northern Cape</option>
								<option value="North West">North West</option>
								<option value="Western Cape">Western Cape</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<Row className="row-xs">
				<Col lg={12} className="mg-b-10">
					<Card className="mg-b-10">
						<CardBody>
							<div className="media">
							<span className="tx-color-04"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download wd-60 ht-60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></span>
							<div className="media-body mg-l-20">
								<h6 className="mg-b-10">The charts below show projected hospital resource use based on COVID-19 deaths. The model assumes continued social distancing until the end of May 2020.</h6>
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
				<Col sm={6} lg={4}>
					<ResourceCountStats
						heading="All Beds"
						value="3,137"
						summary="Estimated daily unique views per visitor on the ads."
						txColor="primary"
					/>
				</Col>
				<Col sm={6} lg={4} className="mg-t-10 mg-sm-t-0">
					<ResourceCountStats
						heading="Bed Shortages"
						value="2,231"
						summary="Estimated daily unique views per visitor on the ads."
						txColor="pink"
					/>
				</Col>
				<Col sm={6} lg={4} className="mg-t-10 mg-sm-t-0">
					<ResourceCountStats
						heading="Mobile Labs"
						value="1,343"
						summary="Estimated daily unique views per visitor on the ads."
						txColor="teal"
					/>
				</Col>
				<Col lg={12} xl={8} className="mg-t-10">
					<ResourceUseStats />
				</Col>
				<Col lg={12} xl={8} className="mg-t-10">
					<Card className="mg-b-10">
						<div className="card-header pd-y-20 d-md-flex align-items-center justify-content-between">
							<h6 className="mg-b-5">Deaths Per Day</h6>
							<ul className="list-inline d-flex mg-t-20 mg-sm-t-10 mg-md-t-0 mg-b-0">
								<li className="list-inline-item d-flex align-items-center">
									<span className="d-block wd-10 ht-10 bg-df-1 rounded mg-r-5"></span>
									<span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Growth Actual</span>
								</li>
								<li className="list-inline-item d-flex align-items-center mg-l-5">
									<span className="d-block wd-10 ht-10 bg-df-2 rounded mg-r-5"></span>
									<span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Actual</span>
								</li>
								<li className="list-inline-item d-flex align-items-center mg-l-5">
									<span className="d-block wd-10 ht-10 bg-df-3 rounded mg-r-5"></span>
									<span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Projected</span>
								</li>
							</ul>
						</div>
						<CardBody className="pos-relative">
							{/* <div className="pos-absolute t-20 l-20 wd-xl-100p z-index-10"> */}
							<div>
								<Row>
									<Col sm={5}>
										<h3 className="tx-normal tx-rubik tx-spacing--2 mg-b-5">0</h3>
										<h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-10">Days</h6>
										<p className="mg-b-0 tx-12 tx-color-03">Until peak count of daily deaths.</p>
									</Col>
									<Col sm={5} className="mg-t-20 mg-sm-t-0">
										<h3 className="tx-normal tx-rubik tx-spacing--2 mg-b-5">0</h3>
										<h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-10">COVID-19 deaths</h6>
										<p className="mg-b-0 tx-12 tx-color-03">Projected on April 1, 2020.</p>
									</Col>
								</Row>
							</div>
							<div className="chart-one" />
						</CardBody>
					</Card>
				</Col>
				<Col lg={12} xl={8} className="mg-t-10">
					<Card className="mg-b-10">
						<div className="card-header pd-t-20 d-sm-flex align-items-start justify-content-between bd-b-0 pd-b-0">
							<div>
								<h6 className="mg-b-5">Total Deaths</h6>
								<p className="tx-13 tx-color-03 mg-b-0">Total COVID-19 deaths projected to April 1, 2020</p>
							</div>
						</div>
						<CardBody className="pd-y-30">
							<div className="d-sm-flex">
								<div className="media">
									<div className="wd-40 wd-md-50 ht-40 ht-md-50 bg-teal tx-white mg-r-10 mg-md-r-10 d-flex align-items-center justify-content-center rounded op-6">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
									</div>
									<div className="media-body">
										<h4 className="tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0">0</h4>
										<h6 className="tx-sans tx-uppercase tx-10 tx-spacing-1 tx-color-03 tx-semibold tx-nowrap mg-b-5 mg-md-b-8">COVID-19 deaths</h6>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col lg={12} xl={8} className="mg-t-10">
					<Card className="mg-b-10">
						<div className="card-header d-flex align-items-start justify-content-between">
							<h6 className="lh-5 mg-b-0">Total COVID-19 Cases and Deaths</h6>
							<a href="/" className="tx-13 link-03">Mar 01 - Mar 20, 2019 <i className="icon ion-ios-arrow-down"></i></a>
						</div>
						<CardBody className="pd-y-15 pd-x-10">
							<div className="table-responsive">
								<table className="table table-borderless table-sm tx-13 tx-nowrap mg-b-0">
									<thead>
										<tr className="tx-10 tx-spacing-1 tx-color-03 tx-uppercase">
											<th>Province</th>
											<th className="text-right">All Cases</th>
											<th className="text-right">New Cases</th>
											<th className="text-right">Deaths</th>
											<th className="text-right">Recoveries</th>
											<th className="text-right">Fatalities</th>
											<th className="text-right">Percentage (%)</th>
											<th className="text-right">Value (%)</th>
											<th className="wd-5p">Link</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="align-middle tx-medium">Gauteng</td>
											<td className="text-right">410</td>
											<td className="text-right">13</td>
											<td className="text-right">2</td>
											<td className="text-right">2</td>
											<td className="text-right">1</td>
											<td className="align-middle text-right">
											<div className="wd-150 d-inline-block">
												<div className="progress ht-4 mg-b-0">
												<div className="progress-bar bg-teal wd-65p" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											</td>
											<td className="align-middle text-right"><span className="tx-medium">65.35%</span></td>
											<td className="align-middle text-center">
												<a href="/">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
												</a>
											</td>
										</tr>
										<tr>
											<td className="align-middle tx-medium">North West</td>
											<td className="text-right">23</td>
											<td className="text-right">1</td>
											<td className="text-right">0</td>
											<td className="text-right">2</td>
											<td className="text-right">1</td>
											<td className="align-middle text-right">
											<div className="wd-150 d-inline-block">
												<div className="progress ht-4 mg-b-0">
												<div className="progress-bar bg-primary wd-85p" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											</td>
											<td className="text-right"><span className="tx-medium">84.97%</span></td>
											<td className="align-middle text-center">
												<a href="/">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
												</a>
											</td>
										</tr>
										<tr>
											<td className="align-middle tx-medium">Western Cape</td>
											<td className="text-right">23</td>
											<td className="text-right">3</td>
											<td className="text-right">1</td>
											<td className="text-right">2</td>
											<td className="text-right">1</td>
											<td className="align-middle text-right">
											<div className="wd-150 d-inline-block">
												<div className="progress ht-4 mg-b-0">
												<div className="progress-bar bg-warning wd-45p" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											</td>
											<td className="text-right"><span className="tx-medium">38.66%</span></td>
											<td className="align-middle text-center">
												<a href="/">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
												</a>
											</td>
										</tr>
										<tr>
											<td className="align-middle tx-medium">KwaZulu Natal</td>
											<td className="text-right">187</td>
											<td className="text-right">9</td>
											<td className="text-right">1</td>
											<td className="text-right">2</td>
											<td className="text-right">1</td>
											<td className="align-middle text-right">
											<div className="wd-150 d-inline-block">
												<div className="progress ht-4 mg-b-0">
												<div className="progress-bar bg-pink wd-15p" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											</td>
											<td className="text-right"><span className="tx-medium">16.11%</span></td>
											<td className="align-middle text-center">
												<a href="/">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
												</a>
											</td>
										</tr>
										<tr>
											<td className="align-middle tx-medium">Limpopo</td>
											<td className="text-right">13</td>
											<td className="text-right">2</td>
											<td className="text-right">0</td>
											<td className="text-right">2</td>
											<td className="text-right">1</td>
											<td className="align-middle text-right">
											<div className="wd-150 d-inline-block">
												<div className="progress ht-4 mg-b-0">
												<div className="progress-bar bg-teal wd-60p" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											</td>
											<td className="text-right"><span className="tx-medium">59.34%</span></td>
											<td className="align-middle text-center">
												<a href="/">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
												</a>
											</td>
										</tr>
										</tbody>
								</table>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Home;
