<script setup>
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';

function openUrl(url) {
	window.open(url, '_blank');
}

</script>
<template>
	<h1>SMART BART</h1>
	<Fieldset legend="About BART">
		Bay Area Rapid Transit (BART) is a rapid transit system serving the San Francisco Bay Area in
		California. BART serves 50 stations along six routes on 131 miles of rapid transit lines, including a
		10mile spur line in eastern Contra Costa County which uses diesel multiple-unit trains and a 3.2 mile
		automated guideway transit line to the Oakland International Airport. With an average of 411,000 weekday
		passengers and 118 million annual passengers in fiscal year 2019, BART is the fifth-busiest heavy rail
		rapid transit system in the United States and is operated by the Bay Area Rapid Transit District which
		formed in 1957. The initial system opened in stages from 1972 to 1974. The system was extended most
		recently on June 13, 2020, when Milpitas and Berryessa/North San José stations opened as part of the
		Silicon Valley BART extension in partnership with the Santa Clara Valley Transportation Authority (VTA).
		<div style="padding:.5em"></div>
		<Button @click="openUrl('https://bart.gov')">
			More About Bart
		</Button>
	</Fieldset>
	<div style="padding:.5em"></div>
	<Fieldset legend="About SMART BART">
		SMART BART is a new tool for finding the most efficient route between two chosen BART stations. Once you
		input your starting and ending station, SMART BART will find the most efficent route in terms of times
		and transfers between your chosen stations.<br>
		<div style="padding:.5em"></div>
		<Button @click="$router.push('/findRoute')">
			Click here to get started
		</Button>
	</Fieldset>
</template>

<style lang="scss">
h1 {
	margin: 15px;
}
</style>
