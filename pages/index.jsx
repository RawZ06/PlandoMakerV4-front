import React from "react";
import View from "../components/View";

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<div class="container">
					<h1 style={{ textAlign: "center" }}>
						Welcome to PlandoMaker V4.0
					</h1>
					<p>
						This is a new version of PlandoMaker ! Its objective is
						be fluid and faster with a new algorithm to generate
						medium seed difficulty. This is a alpha version and all
						features aren't implemented. The new algorithm is not
						available because isn't done.
						<div>
							Access : <a href="/settings">Click here</a>
						</div>
					</p>
				</div>
			</View>
		);
	}
}

export default Home;
