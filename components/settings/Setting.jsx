import React from "react";
import Setting_List from "./Setting/Setting_List";
import Setting_Scale from "./Setting/Setting_Scale";
import Setting_Switch from "./Setting/Setting_Switch";

class Setting extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.setting.type == "list") {
			return (
				<div>
					{this.props.setting.gui_text}
					<Setting_List setting={this.props.setting}></Setting_List>
				</div>
			);
		} else if (this.props.setting.type == "scale")
			return (
				<div>
					{this.props.setting.gui_text}
					<Setting_Scale setting={this.props.setting}></Setting_Scale>
				</div>
			);
		else
			return (
				<div>
					{this.props.setting.gui_text}
					<Setting_Switch
						setting={this.props.setting}
					></Setting_Switch>
				</div>
			);
	}
}

export default Setting;
