import React from "react";
import {
	Switch,
	Select,
	Input,
	MenuItem,
	FormControl,
} from "@material-ui/core";
import setting_store from "../../../stores/setting";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

class Setting extends React.Component {
	constructor(props) {
		super(props);
		let index = setting_store
			.getState()
			.list.map((e) => e.name)
			.indexOf(this.props.setting.name);
		this.state = {
			setting:
				index >= 0 ? setting_store.getState().list[index].choices : [],
			enable: index >= 0,
		};
		this.selectHandleChange = this.selectHandleChange.bind(this);
		this.switchHandleChange = this.switchHandleChange.bind(this);
	}

	selectHandleChange(event, newValue) {
		const value = newValue.props.value;
		const setting = this.state.setting;
		let index = setting.indexOf(value);
		if (index >= 0) setting.splice(index, 1);
		else setting.push(value);
		this.setState({ setting: setting });
		this.handleChange("UPDATE");
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
				choices: this.state.setting,
				type: "list",
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
		return (
			<div>
				{this.switchEnable()}
				<div>
					<FormControl
						style={{
							maxWidth: "100%",
							minWidth: "100%",
						}}
					>
						<Select
							labelId="demo-mutiple-name-label"
							id="demo-mutiple-name"
							multiple
							value={this.state.setting}
							onChange={this.selectHandleChange}
							input={<Input />}
							MenuProps={MenuProps}
							style={{ width: "100%" }}
							disabled={!this.state.enable}
						>
							{Object.keys(this.props.setting.choices).map(
								(setting) => (
									<MenuItem key={setting} value={setting}>
										{this.props.setting.choices[setting]}
									</MenuItem>
								)
							)}
						</Select>
					</FormControl>
				</div>
			</div>
		);
	}
}

export default Setting;
