import React from "react";
import View from "../../components/View";
import { Paper, Tab, Tabs, Button } from "@material-ui/core";
import Body from "../../components/settings/Body";
import settings from "../../data/settings.json";
import setting_store from "../../stores/setting";
import API from "../../api";

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.th;
		this.state = {
			value: -1,
			settings: null,
			setting_string: "",
			array: [],
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, newValue) {
		this.setState({
			value: newValue,
			settings: settings[Object.keys(settings)[newValue]],
		});
	}

	componentDidMount() {
		this.setState({
			settings: settings["Main Rules"],
			value: 0,
			setting_string: setting_store.getState().string,
			array: setting_store.getState().bits,
		});
		setting_store.subscribe(() => {
			this.setState({
				setting_string: setting_store.getState().string,
				array: setting_store.getState().bits,
			});
		});
	}

	render() {
		if (this.state.value < 0) return <div></div>;
		else
			return (
				<View>
					<div className="mt-3 mb-3">
						Setting string : {this.state.setting_string}
					</div>
					<Button
						onClick={API.generate}
						variant="contained"
						color="primary"
					>
						Generate
					</Button>
					<Paper square>
						<Tabs
							value={this.state.value}
							indicatorColor="primary"
							textColor="primary"
							onChange={this.handleChange}
						>
							{Object.keys(settings).map((tab) => (
								<Tab key={tab} label={tab} />
							))}
						</Tabs>
					</Paper>
					<Body settings={this.state.settings} />
				</View>
			);
	}
}

export default Settings;
