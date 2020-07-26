import React from "react";
import { Switch, Slider } from "@material-ui/core";
import setting_store from "../../../stores/setting";

class Setting extends React.Component {
	constructor(props) {
		super(props);
		let index = setting_store
			.getState()
			.list.map((e) => e.name)
			.indexOf(this.props.setting.name);
		this.state = {
			value:
				index >= 0
					? setting_store.getState().list[index].values
					: [this.props.setting.min, this.props.setting.max],
			// enable: index >= 0,
			enable: false,
		};
		this.sliderHandleChange = this.sliderHandleChange.bind(this);
		this.switchHandleChange = this.switchHandleChange.bind(this);
	}

	componentDidMount() {
		// this.handleChange("UPDATE");
	}

	sliderHandleChange(event, newValue) {
		this.setState({ value: newValue });
		this.handleChange("UPDATE");
	}

	switchHandleChange(event, newValue) {
		this.setState({ enable: newValue });
		if (newValue) this.handleChange("ADD");
		else this.handleChange("REMOVE");
	}

	getChoices(values) {
		const choices_available = ["easy", "medium", "hard", "very_hard"];
		const min = 0;
		const max = 100;
		const diff = max - min;
		let choices = choices_available;
		return choices;
	}

	handleChange(action) {
		setting_store.dispatch({
			type: action,
			setting: {
				name: this.props.setting.name,
				values: this.state.value,
				choices: this.getChoices(this.state.value),
				type: "scale",
			},
		});
	}

	switchEnable() {
		return (
			<>
				<span class="badge badge-danger">Disabled</span>
				<Switch
					checked={this.state.enable}
					onChange={this.switchHandleChange}
					disabled={true}
				/>
			</>
		);
	}

	render() {
		return (
			<div>
				{this.switchEnable()}
				<div className="ml-3 mr-5">
					<Slider
						value={this.state.value}
						onChange={this.sliderHandleChange}
						min={this.props.setting.min}
						max={this.props.setting.max}
						valueLabelDisplay="auto"
						aria-labelledby="range-slider"
						// disabled={!this.state.enable}
						disabled={true}
					/>
				</div>
			</div>
		);
	}
}

export default Setting;
