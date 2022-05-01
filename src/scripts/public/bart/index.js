class Bart {
    #utils = {
        createUrl: (endpoint, command, options) => {
            let url = `${this.#config.BASE_URL}${endpoint}.aspx?`;
            url += new URLSearchParams({
                ...{
                    cmd: command,
                    key: this.#config.API_KEY,
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
    #config = {
        initalized: false,
    };
    // #endpoints = require("./endpoints.js");
    #database = {};
    constructor(API_KEY = "MW9S-E7SL-26DU-VV8V") {
        this.#config.API_KEY = API_KEY;
        this.#config.BASE_URL = "https://api.bart.gov/api/";

    }
    async init() {
        if (this.#config.initalized) {
            throw new Error("Bart API wrapper is either already initalized or is currently undergoing the initialization process.");
            return false;
        }
        this.#config.initalized = true;
        //get information on all stations
        console.log("Fetching station information...");
        let stations = (
            await this.#utils.getData(this.#utils.createUrl("stn", "stns"))
        ).root.stations.station;
        this.#database.stations = stations;
        //get information on all routes
        console.log("Fetching route information...")
        let routes = (
            await this.#utils.getData(
                this.#utils.createUrl("route", "routeinfo", {
                    route: "all"
                })
            )
        ).root.routes.route;
        this.#database.routes = routes;
        console.log(this.#database);


        console.log("Bart API Wrapper Initialized");
        return true;
    }


	getStations() {
		return this.#database.stations;
	}

	getRoutes() {
		return this.#database.routes;
	}
}

module.exports = Bart;