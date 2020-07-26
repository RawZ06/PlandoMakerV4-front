import setting_store from "../stores/setting";
import axios from "axios";
import setting_list from "../data/settings.json";

function getRandomInt(min, max) {
	return Math.floor(min + Math.random() * Math.floor(max - min));
}

class API {
	constructor(host, port, generate_link, base) {
		this.host = host ? host : "localhost";
		this.port = port ? port : "8000";
		this.generate_link = generate_link ? generate_link : "/generate.php"
		this.generate = this.generate.bind(this);
		this.exportToJson = this.exportToJson.bind(this);
		axios.defaults.baseURL = base + "://" + this.host + (port == "80" ? "" : ":" + this.port) + "/";
	}

	findSettingInList(setting_name) {
		for (let settings of Object.values(setting_list)) {
			for (let setting of settings) {
				if (setting_name !== null && setting.name == setting_name)
					return setting;
			}
		}
		return null;
	}

	convertScale(result) {
		for (let setting_name of Object.keys(result.settings)) {
			const value = result.settings[setting_name];
			if (["easy", "medium", "hard", "very_hard"].indexOf(value) > 0) {
				const setting = this.findSettingInList(setting_name);
				const min = setting.min;
				const max = setting.max;
				const diff = max - min;
				let minimal, maximal;
				switch (value) {
					case "easy":
						minimal = min;
						maximal = min + (1 / 4) * diff;
						break;
					case "medium":
						minimal = min + (1 / 4) * diff;
						maximal = min + (1 / 2) * diff;
						break;
					case "hard":
						minimal = min + (1 / 2) * diff;
						maximal = min + (3 / 4) * diff;
						break;
					case "very_hard":
						minimal = min + (3 / 4) * diff;
						maximal = max;
						break;
					default:
						minimal = min;
						maximal = max;
						break;
				}
				result.settings[setting_name] = getRandomInt(minimal, maximal);
			}
		}
		return result;
	}

	exportToJson(objectData) {
		let filename = "export.json";
		let contentType = "application/json;charset=utf-8;";
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			var blob = new Blob(
				[decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
				{ type: contentType }
			);
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			var a = document.createElement("a");
			a.download = filename;
			a.href =
				"data:" +
				contentType +
				"," +
				encodeURIComponent(JSON.stringify(objectData));
			a.target = "_blank";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	}

	generate(e) {
		e.preventDefault();
		const that = this;
		let axiosConfig = {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Accept: "*",
				"Access-Control-Allow-Origin": "*",
			},
		};
		axios
			.post(
				this.generate_link,
				{
					settings: setting_store.getState().list,
				},
				axiosConfig
			)
			.then(function (res) {
				that.exportToJson(that.convertScale(res.data));
			});
	}
}

let api;
if(process.env.NODE_ENV === 'production')
	api = new API("ootplandomizer.com", "80", "/generate", "https");
else 
	api = new API("localhost", "8080", "/generate.php", "http");
export default api;