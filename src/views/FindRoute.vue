<script setup>
import { ref } from "vue";
const selectedBartStations = ref({from: null, to: null});
const allBartStations = ref([
	{ name: 'Australia', code: 'AU' },
	{ name: 'Brazil', code: 'BR' },
	{ name: 'China', code: 'CN' },
	{ name: 'Egypt', code: 'EG' },
	{ name: 'France', code: 'FR' },
	{ name: 'Germany', code: 'DE' },
	{ name: 'India', code: 'IN' },
	{ name: 'Japan', code: 'JP' },
	{ name: 'Spain', code: 'ES' },
	{ name: 'United States', code: 'US' }
]);

function findRoute(){
console.log("Home Route");
console.log(selectedBartStations.value);
}
// console.log("here");
</script>

<template>
			<div id="test">Debug:</div>
			{{ selectedBartStations}}

			<div></div>
			<!-- From station -->
			<Dropdown v-model="selectedBartStations.from" :options="allBartStations" optionLabel="name" :filter="true"
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
					<div class="country-item">
						<!-- the thing shown in the actual dropdown menu -->
						<!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" /> -->
						<div>{{ slotProps.option.name }}</div>
						
					</div>
				</template>
			</Dropdown>
			
</template>


<style lang="scss" scoped>
#test{
	color: red
}
.p-dropdown {
	width: 17rem,
	&{	
		text-align: left;
	}
}
</style>