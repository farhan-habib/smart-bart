import { defineStore } from "pinia";
import Bart from "@/scripts/public/bart";
let bartClient = new Bart();

export const GlobalBartClient = defineStore({
	id: "bartMapStore",
	state: () => ({
		bartClient,
		bartClientIsInitialized: bartClient.init(),
	}),
});
