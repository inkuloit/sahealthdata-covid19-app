import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import config from '../config';
import {
	Card,
	CardBody,
	Container,
	Col,
	Row,
} from 'reactstrap';
import {
	CaseStats,
	DeathsPerDayStats,
	ResourceUseStats,
	ResourceCountStats,
	TotalDeathStats,
} from 'components';
import { CountriesProvider, StatsProvider } from 'providers';

const defaultStatSumm = {
	allbed_mean: 0,
	icubed_mean: 0,
	allbed_lower: 0,
	icubed_lower: 0,
	mobilab_mean: 0
};

const Projections = () => {
	const [provinces, setProvinces] = useState([]);
	const [statSumm, setStatSumm] = useState({});
	const [province, setProvince] = useState('all');
	const [view, setView] = useState('provinces');
	const [loaded, setLoaded] = useState(false);
	const [query, setQuery] = useState('');

	document.title = 'Coronavirus Projections - South Africa';

	useEffect(() => {
		const fetchData = async () => {
			let query = '';
			const provinces = await CountriesProvider.getProvinces(config.project.company);
			if (window.location.search) {
				const obj = queryString.parse(window.location.search);
				if (obj.p) {
					const province = provinces.filter(item => item.name === obj.p);
					setProvince(province[0].name);
					query = `province_id=${province[0].id}`;
					setQuery(query);
					setView('districts');
				}
			}
			const statSumm = await StatsProvider.get('resources', 'all', query);
			setProvinces(provinces);
			setStatSumm(statSumm.length > 0 ? statSumm[0] : defaultStatSumm);
			setLoaded(true);
		};
		fetchData();
	}, []);

	const handleSelectProvince = async (e) => {
		const province = e.currentTarget.value;
		const query = province === 'all' ? '' : `?p=${province}`;
		window.location = `/projections${query}`;
	};

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
					<h4 className="mg-b-0 tx-spacing--1">
						COVID-19 Projections
						<span className="tx-color-03">{province !== 'all' ? ` for ${province}` : ''}</span>
					</h4>
				</div>
				<div className="d-none d-md-block">
					<div data-label="Example" className="df-example demo-forms">
						<div>
							<select
								className="form-control select2"
								onChange={handleSelectProvince}
								value={province}
							>
								<option label="All Provinces (South Africa)" value="all">All Provinces</option>
								{provinces.length > 0
								&& provinces.map(province => {
									if (province.iso_code !== 'UA')
										return (<option key={province.id} label={province.name} value={province.name}>{province.name}</option>)
									return null;
									
								})}
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
								<span className="tx-color-04">
									<img src={require('images/icons/info.svg')} alt="" />
								</span>
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
					{loaded
					&& (<ResourceCountStats
						heading="All Beds"
						value={statSumm.allbed_mean ? statSumm.allbed_mean : 0}
						summary="Estimated daily unique views per visitor on the ads."
						txColor="primary"
					/>)}
				</Col>
				<Col sm={6} lg={4} className="mg-t-10 mg-sm-t-0">
					{loaded
					&& (<ResourceCountStats
						heading="Bed Shortages"
						value={statSumm.allbed_lower ? statSumm.allbed_lower : 0}
						summary="Estimated daily unique views per visitor on the ads."
						txColor="pink"
					/>)}
				</Col>
				<Col sm={6} lg={4} className="mg-t-10 mg-sm-t-0">
					{loaded
					&& (<ResourceCountStats
						heading="Mobile Labs"
						value={statSumm.mobilab_mean ? statSumm.mobilab_mean : 0}
						summary="Estimated daily unique views per visitor on the ads."
						txColor="teal"
					/>)}
				</Col>
				<Col lg={12} className="mg-t-10">
					<ResourceUseStats
						{...statSumm}
						view={view}
						loaded={loaded}
						query={query}
						province={province}
					/>
				</Col>
				<Col lg={12} className="mg-t-10">
					<DeathsPerDayStats
						view={view}
						loaded={loaded}
						query={query}
						province={province}
					/>
				</Col>
				<Col lg={12} className="mg-t-10">
					<TotalDeathStats
						view={view}
						loaded={loaded}
						query={query}
						province={province}
					/>
				</Col>
				<Col lg={12} className="mg-t-10">
					<CaseStats
						view={view}
						loaded={loaded}
						query={query}
						province={province}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default Projections;
