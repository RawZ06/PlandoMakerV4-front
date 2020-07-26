import { createStore } from "redux";
import setting_list from "../data/settings.json";

/**
 * Search what is the bit in the array corresponding at the setting
 */
function setting_to_bit_index(setting_name) {
	let index = 0;
	for (let settings of Object.values(setting_list)) {
		for (let setting of settings) {
			if (setting_name !== null && setting.name == setting_name)
				return index;

			if (setting.type == "list")
				index += 1 + Object.keys(setting.choices).length;
			else if (setting.type == "scale") index += 21;
			// Here we write value on 10bits for each values
			else index += 1;
		}
	}
	return setting_name === null ? index : -1;
}

/**
 * Get all informations from settings_name (used to get choices)
 */
function find_setting_from(setting_name) {
	for (let settings of Object.values(setting_list)) {
		for (let setting of settings) {
			if (setting_name !== null && setting.name == setting_name)
				return setting;
		}
	}
	return null;
}

function array_to_string(array) {
	let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let bits = array.filter(() => true);
	//pad the bits array to be multiple of 5
	if (bits.length % 5 > 0)
		for (let i = 0; i < 5 - (bits.length % 5); i++) bits.push(0);
	//convert to characters
	let result = "";
	for (let i = 0; i < bits.length; i += 5) {
		let value = 0;
		for (let b = i; b < i + 5; b++) value |= bits[b] << (b - i);
		result += chars[value];
	}
	return result;
}

function settings_manager(
	settings = {
		list: [],
		bits: Array(setting_to_bit_index(null)).fill(0),
		string: array_to_string(Array(setting_to_bit_index(null)).fill(0)),
	},
	action
) {
	switch (action.type) {
		case "ADD":
			settings.list.push(action.setting);
			settings.bits[setting_to_bit_index(action.setting.name)] = 1;
			settings.string = array_to_string(settings.bits);
			return settings;
		case "REMOVE":
			settings.list.splice(settings.list.indexOf(action.setting), 1);
			settings.bits[setting_to_bit_index(action.setting.name)] = 0;
			settings.string = array_to_string(settings.bits);
			return settings;
		case "UPDATE":
			settings.list.splice(settings.list.indexOf(action.setting), 1);
			if (action.setting.type == "list") {
				//get index of the setting
				let index = setting_to_bit_index(action.setting.name);
				//get its properties
				let setting_properties = find_setting_from(action.setting.name);
				//get choices
				let choices = Object.keys(setting_properties.choices);
				//for each choice update its bit
				for (let i = 0; i < choices.length; i++) {
					if (action.setting.choices.includes(choices[i]))
						settings.bits[index + i + 1] = 1;
					else settings.bits[index + i + 1] = 0;
				}
			} else if (action.setting.type == "scale") {
				//get index of the setting
				let index = setting_to_bit_index(action.setting.name);
				let min = action.setting.values[0];
				let max = action.setting.values[1];
				for (let i = 0; i < 10; i++) {
					if (min & (1 << (10 - i))) settings.bits[index + i + 1] = 1;
					else settings.bits[index + i + 1] = 0;
				}
				index += 10;
				for (let i = 0; i < 10; i++) {
					if (max & (1 << (10 - i))) settings.bits[index + i + 1] = 1;
					else settings.bits[index + i + 1] = 0;
				}
			}
			settings.string = array_to_string(settings.bits);
			settings.list.push(action.setting);
			return settings;
		default:
			return settings;
	}
}

export default createStore(settings_manager);
