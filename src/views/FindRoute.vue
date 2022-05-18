<script setup>
import { ref } from "vue";
import bartMap from "../components/bartMap.vue";
import { GlobalBartClient } from "../stores/bartStore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import routeFindingAlgorithm from "@/scripts/public/routeFindingAlgorithm";


let userRouteDisplayManager = ref({
	route: null,
	displayModal: false,
	setRoute(route) {
		this.route = route;
	},
	showRoutes: function () {
		this.displayModal = true;
	},
	hideRoutes: function () {
		this.displayModal = false;
	}
});



let bartClient = GlobalBartClient();
let bartClientInitialized = ref(false);
console.log(bartClient.bartClientIsInitialized);
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
	console.log(routeFindingAlgorithm({ bartStations: bartClient.bartClient._database.stations, bartRoutes: bartClient.bartClient._database.routes }, selectedBartStations.value.from.abbr, selectedBartStations.value.to.abbr));
	//show routes to user
	userRouteDisplayManager.value.setRoute(routeFindingAlgorithm({ bartStations: bartClient.bartClient._database.stations, bartRoutes: bartClient.bartClient._database.routes }, selectedBartStations.value.from.abbr, selectedBartStations.value.to.abbr));
	userRouteDisplayManager.value.showRoutes();
}
let bartMapElem = ref();
function testFunction() {
	console.log(routeFindingAlgorithm({ bartStations: bartClient.bartClient._database.stations, bartRoutes: bartClient.bartClient._database.routes }, selectedBartStations.value.from.abbr, selectedBartStations.value.to.abbr));
}

function testFunction2() {
	console.log(userRouteDisplayManager.value)
}

</script>
<template>

	{{ selectedBartStations }}
	<!-- {{ bartClient.bartClient._database.stations }} -->
	<div v-if="!bartClientInitialized">
		<ProgressBar mode="indeterminate" />
	</div>
	<Dialog class="userRoutesDisplayDialog" header=" Your Route" v-model:visible="userRouteDisplayManager.displayModal"
		:maximizable="true" :dismissableMask="true" :modal="true">
		<p class="m-0">{{ userRouteDisplayManager.route }}</p>
		<template #footer>
			<!-- <Button label="No" icon="pi pi-times" @click="userRouteDisplayManager.hideRoutes" class="p-button-text" /> -->
			<Button label="Ok" icon="pi pi-check" @click="userRouteDisplayManager.hideRoutes" />
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
					<div class="field col">
						<Button class="btn btn-primary" @click="findRoute">Find Route</Button>
					</div>
				</div>
			</div>

			<div id="bartMapContainer" class="col-12 col-md-6">
				<bartMap ref="bartMapElem" id="bartMap"></bartMap>
			</div>
		</div>
	</div>
	<Button label="Test" @click="testFunction" />
	<Button label="Test2" @click="testFunction2" />
</template>

<style lang="scss" scoped>
//credit to primevue for this class
.card {
	background-color: var(--surface-card);
	padding: 1.5rem;
	color: var(--surface-900);
	margin-bottom: 1rem;
	border-radius: 12px;
	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
		0px 1px 4px rgba(0, 0, 0, 0.08) !important;

	&.card-w-title {
		padding-bottom: 2rem;
	}
}

#bartUserInputGrid {
	margin-top: 2em;
}

#bartMap {
	height: 0;
	width: 100%;
	padding-bottom: 100%;
	// padding:0;
	// margin:0;
	// width:100%;
	// height:100%;
	// // min-height:50em;
	// height:auto;
}

.stationSelectorMenu {
	width: 100%;
	height: 100%;

	& {
		text-align: left;
	}
}
</style>
