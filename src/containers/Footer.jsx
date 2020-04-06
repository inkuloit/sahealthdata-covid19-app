import React from 'react';

export default function Footer(props) {
	const { subdomain } = props;

	return (
		<footer className="footer">
			<div>
				<span>{subdomain} &copy; 2020 Healthdata v1.0.0. </span>
				<span>
					Created by&nbsp;
					<a href="http://inkuloit.co.za" target="_blank" rel="noopener noreferrer">
						Inkulo IT
					</a>
				</span>
			</div>
			<div>
				<nav className="nav">
					<a href="/" className="nav-link">Licenses</a>
					<a href="/" className="nav-link">Change Log</a>
					<a href="/" className="nav-link">Get Help</a>
				</nav>
			</div>
		</footer>
	)
}
