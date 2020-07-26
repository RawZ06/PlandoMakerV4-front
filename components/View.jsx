import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import { Container } from "@material-ui/core";
import { version, type } from "../version.json";

class View extends React.Component {
	constructor() {
		super();
		this.state = {
			pages: [
				{
					name: "Home",
					path: "/",
				},
				{
					name: "Random Settings",
					path: "/settings",
				},
				{
					name: "Changelog",
					path: "/changelog",
				},
			],
		};
	}

	render() {
		return (
			<div>
				<Head>
					<script
						src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
						integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
						integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
						integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
						crossOrigin="anonymous"
					></script>
					<link
						rel="stylesheet"
						href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
						integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
						crossOrigin="anonymous"
					/>
				</Head>
				<div>
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
						<a className="navbar-brand" href="/">
							<img
								width="100px"
								alt="Logo Plando Maker with an Ocarina"
								title="Logo Plando Maker"
								src="https://camo.githubusercontent.com/c839ff6640bdc43622b238fae2a8d8b13422816d/68747470733a2f2f6f6f74706c616e646f6d697a65722e636f6d2f7374617469632f696d672f6c6f676f2e663063623337392e706e67"
							></img>
							<small
								style={{ fontSize: "50%" }}
								class={
									type == "release"
										? "badge badge-success m-2"
										: "badge badge-danger m-2"
								}
							>
								{version}
							</small>
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarColor01"
							aria-controls="navbarColor01"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarColor01"
						>
							<ul className="navbar-nav mr-auto">
								{this.state.pages.map((link, index) => {
									return (
										<li
											key={index}
											className={
												("nav-item",
												this.props.router.pathname ===
													link.path)
													? "active"
													: ""
											}
										>
											<a
												className="nav-link"
												href={link.path}
											>
												{link.name}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</nav>
					<div class="alert alert-warning" role="alert">
						Warning : This is a pre-alpha version ! There are only
						the essential features to generate a random setting
						seed.
					</div>
					<Container maxWidth="xl">{this.props.children}</Container>
				</div>
			</div>
		);
	}
}

export default withRouter(View);
