import React from "react";
import Setting from "./Setting";
import "./body.css";

class Body extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="component mt-4" ref={this.myInput}>
				{this.props.settings.map((setting) => (
					<Setting key={setting.name} setting={setting} />
				))}
			</div>
		);
	}
}

export default Body;
