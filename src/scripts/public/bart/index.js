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

	database = {};
	constructor(API_KEY = "MW9S-E7SL-26DU-VV8V") {
		this._config.API_KEY = API_KEY;
		this._config.BASE_URL = "https://api.bart.gov/api/";
	}
	async init() {
		return new Promise(async (resolve, reject) => {
			if (this._config.initalized) {
				throw new Error(
					"Bart API wrapper is either already initalized or is currently undergoing the initialization process."
				);
				reject(false);
			}
			this._config.initalized = true;
			//get information on all stations
			console.log("Fetching station information...");
			let stations = (
				await this._utils.getData(this._utils.createUrl("stn", "stns"))
			).root.stations.station;
			this.database.stations = stations;
			//get information on all routes
			console.log("Fetching route information...");
			let routes = (
				await this._utils.getData(
					this._utils.createUrl("route", "routeinfo", {
						route: "all",
					})
				)
			).root.routes.route;
			this.database.routes = routes;
			console.log(this.database);

			console.log("Bart API Wrapper Initialized");
			resolve(true);
		});
	}

	getStations() {
		return this.database.stations;
	}

	getRoutes() {
		return this.database.routes;
	}
	getStationFromAbbr(abbr) {
		return this.database.stations.find(station => station.abbr === abbr);
	}
}

export default Bart;