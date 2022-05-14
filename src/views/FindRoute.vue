<script setup>
import { ref } from "vue";
import bartMap from "../components/bartMap.vue";
import { GlobalBartClient } from "../stores/bartStore";
import Swal from "sweetalert2/dist/sweetalert2.js";

let bartClient = GlobalBartClient();
const selectedBartStations = ref({ from: null, to: null });
const allBartStations = ref(bartClient.bartClient.getStations());

function findRoute() {
	// user hasn't selected both an origin AND a destination station
	if (!selectedBartStations.value.from || !selectedBartStations.value.to) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'You need to pick an origin and destination station!',
		})
		return;
	}
}
let bartMapElem = ref();
function testFunction() {
	console.log(bartClient.bartClient.getStations());
}


</script>
				<div class="card">
					<!-- From station -->
					<div class="field col">

						<Dropdown v-model="selectedBartStations.from" :options="allBartStations" optionLabel="name"
							:filter="true" placeholder="Starting Station" :showClear="true">
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
						<Dropdown v-model="selectedBartStations.to" :options="allBartStations" optionLabel="name"
							:filter="true" placeholder="Ending Station" :showClear="true">
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
				</div>


				<div class="card">
					<div class="field col">
						<Button class="btn btn-primary" @click="findRoute">Find Route</Button>
					</div>
				</div>


			</div>
			<div id="bartMapContainer" class="col-12 col-md-6">
				<!-- <div style="height:0;width:100%;padding-bottom:100%;background-color:red"> -->
				<!-- <div> -->
				<!-- <div id="bartMap" style="background-color:blue"></div> -->
				<bartMap ref="bartMapElem" id="bartMap"></bartMap>
				<!-- </div> -->
				<!-- </div> -->

			</div>
		</div>
	</div>

	<Button label="Test" @click="testFunction" />
</template>

<style lang="scss" scoped>
//credit to primevue for this class
.card {
	background-color: var(--surface-card);
	padding: 1.5rem;
	color: var(--surface-900);
	margin-bottom: 1rem;
	border-radius: 12px;
	box-shadow: 0px 3px 5px rgba(0, 0, 0, .02), 0px 0px 2px rgba(0, 0, 0, .05), 0px 1px 4px rgba(0, 0, 0, .08) !important;

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

.p-dropdown {
	width: 100%;

	& {
		text-align: left;
	}
}
</style>
