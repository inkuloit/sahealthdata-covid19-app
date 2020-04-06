import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import config from './config';
import PrivateRoute from './PrivateRoute';

// providers
import { ProjectsProvider, CountriesProvider } from 'providers';

// containers
import Navigation from 'containers/Navigation';
import Footer from 'containers/Footer';

// auth pages/routes
import Login from 'pages/Auth/Login';

// private routes
import AccountProfile from 'pages/cPanel/Account/Profile';
import Dashboard from 'pages/cPanel/Dashboard';
import CaseCapture from 'pages/cPanel/Cases/Capture';
import CaseBulkCapture from 'pages/cPanel/Cases/BulkCapture';
import ResourceCapture from 'pages/cPanel/Resources/Capture';
import ResourceBulkCapture from 'pages/cPanel/Resources/BulkCapture';

// pages/routes
import Projections from 'pages/Projections';

import { AuthContext } from 'context/auth';

const App = () => {
	const [project, setProject] = useState({});
	const [country, setCountry] = useState({});
	const [authTokens, setAuthTokens] = useState();
	const isLogin = window.location.pathname.indexOf('/login') !== -1;

	useEffect(() => {
		const fetchData = async () => {
			const project = await ProjectsProvider.get(config.project.id);
			const country = await CountriesProvider.get(config.project.company);
			setProject(project);
			setCountry(country);
		};
		fetchData();
	}, []);

	const setTokens = (data) => {
		localStorage.setItem('tokens', JSON.stringify(data));
		setAuthTokens(data);
	}

	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router basename={process.env.PUBLIC_URL}>
				{!isLogin && <Navigation country={country} {...project} />}
				<div className="content content-fixed">
					<Switch>
						<Redirect exact from="/" to="/projections" />
						<Route exact path="/projections" component={Projections} />
						<Route exact path="/cpanel/login" component={Login} />
						<PrivateRoute exact path="/cpanel/account/profile" component={AccountProfile} />
						<PrivateRoute exact path="/cpanel/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/cpanel/cases/capture" component={CaseCapture} />
						<PrivateRoute exact path="/cpanel/cases/bulk-capture" component={CaseBulkCapture} />
						<PrivateRoute exact path="/cpanel/resources/capture" component={ResourceCapture} />
						<PrivateRoute exact path="/cpanel/resources/bulk-capture" component={ResourceBulkCapture} />
					</Switch>
				</div>
				{!isLogin && <Footer country={country} {...project} />}
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
