class Bart {
	_utils = {
		createUrl: (endpoint, command, options) => {
			let url = `${this._config.BASE_URL}${endpoint}.aspx?`;
			url += new URLSearchParams({
				...{
					cmd: command,
					key: this._config.API_KEY,
					json: "y",
				},
				...options,
			}).toString();
			return url;
		},
		getData: async (url) => {
			return await fetch(url).then((res) => res.json());
		},
	};
	_config = {
		initalized: false,
	};
	// _endpoints = require("./endpoints.js");
	_database = {};
	constructor(API_KEY = "MW9S-E7SL-26DU-VV8V") {
		this._config.API_KEY = API_KEY;
		this._config.BASE_URL = "https://api.bart.gov/api/";
	}
	async init() {
		if (this._config.initalized) {
			throw new Error(
				"Bart API wrapper is either already initalized or is currently undergoing the initialization process."
			);
			return false;
		}
		this._config.initalized = true;
		//get information on all stations
		console.log("Fetching station information...");
		let stations = (
			await this._utils.getData(this._utils.createUrl("stn", "stns"))
		).root.stations.station;
		this._database.stations = stations;
		//get information on all routes
		console.log("Fetching route information...");
		let routes = (
			await this._utils.getData(
				this._utils.createUrl("route", "routeinfo", {
					route: "all",
				})
			)
		).root.routes.route;
		this._database.routes = routes;
		console.log(this._database);

		console.log("Bart API Wrapper Initialized");
		return true;
	}

	getStations() {
		return this._database.stations;
	}

	getRoutes() {
		return this._database.routes;
	}
}

export default Bart;
