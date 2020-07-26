import React from "react";
import View from "../../components/View";
import changelog from "../../changelog.json";

class Changelog extends React.Component {
	constructor(props) {
		super(props);
	}

	badge(type) {
		switch (type) {
			case "alpha":
				return <span class="badge badge-pill badge-danger">Alpha</span>;
			case "beta":
				return <span class="badge badge-pill badge-danger">Beta</span>;
			case "release":
				return (
					<span class="badge badge-pill badge-success">Release</span>
				);
			default:
				return (
					<span class="badge badge-pill badge-secondary">Unknow</span>
				);
		}
	}

	listing(list) {
		return (
			<ul>
				{list.map((element) => {
					return <li>{element}</li>;
				})}
			</ul>
		);
	}

	render() {
		return (
			<View>
				<h1>Changelog</h1>
				{changelog.map((version) => {
					return (
						<div>
							<h3>
								{version.version} - {this.badge(version.type)}
							</h3>
							{this.listing(version.content)}
						</div>
					);
				})}
			</View>
		);
	}
}

export default Changelog;
