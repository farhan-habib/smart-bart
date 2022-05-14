<script setup>
import { ref } from "vue";
import bartMap from "../components/bartMap.vue";
const selectedBartStations = ref({ from: null, to: null });
const allBartStations = ref([
	{ name: "Australia", code: "AU" },
	{ name: "Brazil", code: "BR" },
	{ name: "China", code: "CN" },
	{ name: "Egypt", code: "EG" },
	{ name: "France", code: "FR" },
	{ name: "Germany", code: "DE" },
	{ name: "India", code: "IN" },
	{ name: "Japan", code: "JP" },
	{ name: "Spain", code: "ES" },
	{ name: "United States", code: "US" },
]);

function findRoute() {
	console.log("Home Route");
	console.log(selectedBartStations.value);
}
// console.log("here");
</script>

<template>
	<div>Debug:</div>
	{{ selectedBartStations }}

	<div></div>

	<div class="grid m-8">
		<div class="col-12 md:col-6">
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
		</div>
		
		<div class="col-12 md:col-6 min-w-min h-auto h-30rem">
			<bartMap></bartMap>
		</div>
	</div>
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

.p-dropdown {

	width: 100%;
	& {
		text-align: left;
	}
}
</style>
