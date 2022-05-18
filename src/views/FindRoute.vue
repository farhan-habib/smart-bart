<script setup>
import { ref } from "vue";
import bartMap from "../components/bartMap.vue";
import { GlobalBartClient } from "../stores/bartStore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import routeFindingAlgorithm from "@/scripts/public/routeFindingAlgorithm";

let userRouteDisplayManager = ref({
	route: [],
	displayModal: false,
	// setRoute: function (route) {
	// 	this.route = route;
	// },
	// getRoute: function () {
	// 	return this.route;
	// },
	showRoutes: function () {
		this.displayModal = true;
	},
	hideRoutes: function () {
		this.displayModal = false;
	}
});

let bartClient = GlobalBartClient();

let bartClientInitialized = ref(false);

bartClient.bartClientIsInitialized.then(function () {
	//determines if the bart client has loaded or not
	bartClientInitialized.value = true;
})

const selectedBartStations = ref({ from: null, to: null });

const allBartStations = ref(bartClient.bartClient._database.stations);

function findRoute() {
	// user hasn't selected both an origin AND a destination station
	if (!selectedBartStations.value.from || !selectedBartStations.value.to) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "You need to pick an origin and destination station!",
		});
		return;
	}
	if (selectedBartStations.value.from === selectedBartStations.value.to) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Origin and destination stations cannot be the same!",
		});
		return;
	}
	userRouteDisplayManager.value.route = [];
	for (const stationAbbr of routeFindingAlgorithm({ bartStations: bartClient.bartClient._database.stations, bartRoutes: bartClient.bartClient._database.routes }, selectedBartStations.value.from.abbr, selectedBartStations.value.to.abbr)) {
		userRouteDisplayManager.value.route.push(bartClient.bartClient.getStationFromAbbr(stationAbbr));
	}

	userRouteDisplayManager.value.showRoutes();

	showAllStations();
	highlightSelected(selectedBartStations.value.from, selectedBartStations.value.to);
}
let bartMapElem = ref();
// function testFunction() {
// 	console.log(routeFindingAlgorithm({ bartStations: bartClient.bartClient._database.stations, bartRoutes: bartClient.bartClient._database.routes }, selectedBartStations.value.from.abbr, selectedBartStations.value.to.abbr));
// }

function showAllStations() {
	bartClient.bartClient.getStations().map(m => bartMapElem.value.addMarker({
		name: m.name,
		desc: m.abbr,
		loc: [m.gtfs_latitude, m.gtfs_longitude],
	}));
}

function highlightSelected(station1, station2) {
	bartMapElem.value.drawPolyline(station1, station2, userRouteDisplayManager.value.route);
}

</script>
<template>

	<!-- {{ selectedBartStations }} -->
	<!-- {{ bartClient.bartClient._database.stations }} -->
	<div v-if="!bartClientInitialized">
		<ProgressBar mode="indeterminate" />
	</div>
	<Dialog class="userRoutesDisplayDialog" header=" Your Route" v-model:visible="userRouteDisplayManager.displayModal"
		:maximizable="true" :dismissableMask="true" :modal="true">
		<!-- <ScrollPanel style="width: 100%; height: 100%; overflow-x hidden !important;" class="custom"> -->

		<Timeline :value="userRouteDisplayManager.route" align="alternate">
			<template #content="slotProps">
				{{ slotProps.item.name }}
			</template>
		</Timeline>
		<!-- <p class="m-0">{{ userRouteDisplayManager.route }}</p> -->
		<!-- </ScrollPanel> -->

		<template #footer>
			<!-- <Button label="No" icon="pi pi-times" @click="userRouteDisplayManager.hideRoutes" class="p-button-text" /> -->
			<Button label="Ok" icon="pi pi-check" @click="userRouteDisplayManager.hideRoutes()" />
		</template>

	</Dialog>
	<div class="container-md">
		<div class="row">
			<!-- user controls -->
			<div class="col-12 col-md-6">
				<div class="card">
					<BlockUI :blocked="!bartClientInitialized">
						<!-- From station -->
						<div class="field col">
							<!-- unsure of why but if I set :options to a ref it doesnt work, but when I directly set it to this it does work. -->
							<Dropdown class="stationSelectorMenu" v-model="selectedBartStations.from"
								:options="bartClient.bartClient._database.stations" optionLabel="name" :filter="true"
								placeholder="Starting Station" :showClear="true">
								<template #value="bartStation">
									<div class="country-item country-item-value" v-if="bartStation.value">
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" /> -->
										<div>{{ bartStation.value.name }}</div>
										<!-- the thing shown in the box when the item is selected -->
									</div>
									<span v-else>
										<!-- The content shown when no option is selected, defined as placeholder property of DropDown element -->
										{{ bartStation.placeholder }}
									</span>
								</template>
								<template #option="slotProps">
									<div class="bartStation-item">
										<!-- the thing shown in the actual dropdown menu -->
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" /> -->
										<div>{{ slotProps.option.name }}</div>
									</div>
								</template>
							</Dropdown>
						</div>
						<div style="padding:.5em"></div>
						<div class="field col">
							<!-- To Station -->
							<Dropdown class="stationSelectorMenu" v-model="selectedBartStations.to"
								:options="bartClient.bartClient._database.stations" optionLabel="name" :filter="true"
								placeholder="Ending Station" :showClear="true">
								<template #value="bartStation">
									<div class="bartStation-item bartStation-item-value" v-if="bartStation.value">
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" /> -->
										<div>{{ bartStation.value.name }}</div>
										<!-- the thing shown in the box when the item is selected -->
									</div>
									<span v-else>
										<!-- The content shown when no option is selected, defined as placeholder property of DropDown element -->
										{{ bartStation.placeholder }}
									</span>
								</template>
								<template #option="slotProps">
									<div class="bartStation-item">
										<!-- the thing shown in the actual dropdown menu -->
										<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" /> -->
										<div>{{ slotProps.option.name }}</div>
									</div>
								</template>
							</Dropdown>
						</div>
					</BlockUI>
				</div>
				<div class="card">
					<div class="field col text-center">
						<div class="d-flex justify-content-center">
							<Button class="btn btn-primary" @click="findRoute">Find Route</Button>
						</div>
					</div>
				</div>
			</div>

			<div id="bartMapContainer" class="col-12 col-md-6">
				<bartMap ref="bartMapElem" id="bartMap"></bartMap>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#bartUserInputGrid {
	margin-top: 2em;
}

#bartMap {
	height: 0;
	width: 100%;
	padding-bottom: 100%;
	border: 8px double var(--surface-border);
}

.stationSelectorMenu {
	width: 100%;
	height: 100%;

	& {
		text-align: left;
	}
}
</style>
