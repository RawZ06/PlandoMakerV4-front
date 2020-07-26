import React from "react";
import { Switch } from "@material-ui/core";
import setting_store from "../../../stores/setting";

class Setting extends React.Component {
	constructor(props) {
		super(props);
		let index = setting_store
			.getState()
			.list.map((e) => e.name)
			.indexOf(this.props.setting.name);
		this.state = {
			enable: index >= 0,
		};
		this.switchHandleChange = this.switchHandleChange.bind(this);
	}

	switchHandleChange(event, newValue) {
		this.setState({ enable: newValue });
		if (newValue) this.handleChange("ADD");
		else this.handleChange("REMOVE");
	}

	handleChange(action) {
		setting_store.dispatch({
			type: action,
			setting: {
				name: this.props.setting.name,
				choices: ["true", "false"],
				type: "switch",
			},
		});
	}

	switchEnable() {
		return (
			<>
				<Switch
					checked={this.state.enable}
					onChange={this.switchHandleChange}
				/>
			</>
		);
	}

	render() {
		return <div>{this.switchEnable()}</div>;
	}
}

export default Setting;
