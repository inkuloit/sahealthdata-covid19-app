import React, { useState } from 'react';
import { Session } from 'bc-react-session';
import { HashLinkContainer } from 'components';
const session = Session.getSession();

function Navigation(props) {
	const { country } = props;
	const [ menuExpanded, setMenuExpanded ] = useState(false);
	const isProjects = window.location.pathname.indexOf('/projections') !== -1;
	const flag = require(`images/flags/russia_flag.jpg`);

	const handleProfileMenuToggle = (e) => {
		e.preventDefault();
		setMenuExpanded(!menuExpanded);
	};

	return (
		<React.Fragment>
			{(session.isValid && !isProjects)
				&& (
				<header className="navbar navbar-header navbar-header-fixed">
					<a href="/cpanel/dashboard" id="mainMenuOpen" className="burger-menu">
						<i data-feather="menu"></i>
					</a>
					<div className="navbar-brand">
						<a href="/cpanel/dashboard" className="df-logo">
							sahealth<span>data</span>cpanel
						</a>
					</div>
					<div className="navbar-right">
						<div className="dropdown dropdown-profile">
							<a
								href="/cpanel/dashboard"
								role="button"
								className="dropdown-link"
								data-toggle="dropdown"
								data-display="static"
								aria-expanded={menuExpanded}
								onClick={handleProfileMenuToggle}
							>
								{session.payload.user.first_name}
								&nbsp;
								{session.payload.user.last_name}
								&nbsp;&nbsp;
								<div className="avatar avatar-sm">
									<img src={flag} className="rounded-circle" alt={session.payload.user.first_name} />
								</div>
								&nbsp;&nbsp;
								<i className="icon ion-ios-arrow-down"></i>
							</a>
							<div className={`dropdown-menu dropdown-menu-right ${menuExpanded ? 'show' : ''} tx-13`}>
								<h6 className="tx-semibold mg-b-5">
									{session.payload.user.first_name}
									&nbsp;
									{session.payload.user.last_name}
								</h6>
								<p className="mg-b-20 tx-12 tx-color-03">
									{session.payload.user.user_role.description}
								</p>

								<HashLinkContainer to="/cpanel/account/profile">
									<button className="dropdown-item"><i data-feather="edit-3"></i> View Profile</button>
								</HashLinkContainer>
								<HashLinkContainer to="/cpanel/auth/profile">
									<button className="dropdown-item"><i data-feather="settings"></i>Account Settings</button>
								</HashLinkContainer>
								<div className="dropdown-divider"></div>
								<a href="/cpanel/login" className="dropdown-item"><i data-feather="log-out"></i>Sign Out</a>
							</div>
						</div>
					</div>
				</header>)}
			{(!session.isValid || isProjects)
				&& (
				<header className="navbar navbar-header navbar-header-fixed">
					<div className="navbar-brand">
						<a href="/projections" className="df-logo">sahealth<span>data</span></a>
					</div>
					<div className="navbar-right">
						<div className="dropdown dropdown-profile">
							<a href="/projections" className="dropdown-link" data-toggle="dropdown" data-display="static" aria-expanded="false">
								{country.name}&nbsp;&nbsp;
								<div className="avatar avatar-sm">
									<img src={flag} className="rounded-circle" alt={country.name} />
								</div>
								&nbsp;&nbsp;
								<i className="icon ion-ios-arrow-down"></i>
							</a>
						</div>
					</div>
				</header>)}
		</React.Fragment>
	);
}

export default Navigation;
