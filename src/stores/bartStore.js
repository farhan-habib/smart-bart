import { defineStore } from "pinia";
import Bart from "@/scripts/public/bart";
let bartClient = new Bart();
bartClient.init();

export const GlobalBartClient = defineStore({
	id: "bartMapStore",
	state: () => ({
		bartClient,
	}),
});
